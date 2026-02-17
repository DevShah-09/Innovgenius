'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure you have this utility

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        text: "Hello! I'm your Innovgenius assistant. I can help you with risk verification or document issues. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a random client ID
    const clientId = Math.floor(Math.random() * 1000);
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${clientId}`);

    socket.onmessage = (event) => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        text: event.data,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (ws && input.trim()) {
      const userMsg: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, userMsg]);
      ws.send(input);
      setInput('');
      setIsTyping(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full items-start gap-2",
                msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={msg.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-sm",
                  msg.sender === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {msg.text}
                <p className="text-[10px] opacity-50 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex w-full items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted"><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background mt-auto">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} // Changed from onKeyPress (deprecated)
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
