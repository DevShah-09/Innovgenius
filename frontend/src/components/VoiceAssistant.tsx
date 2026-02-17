'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Activity } from 'lucide-react';

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);
    setTranscription("Listening...");
    setResponse(null);

    // Simulate recording delay
    setTimeout(async () => {
      setIsRecording(false);
      setProcessing(true);

      // Create a dummy blob to send
      const blob = new Blob(["dummy audio"], { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', blob);

      try {
        const res = await fetch('http://localhost:8000/voice/process', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        setTranscription(data.transcription);
        setResponse(data.response.response_text);
        setProcessing(false);

        // Speak the response using browser API as a fallback/demo for TTS
        const utterance = new SpeechSynthesisUtterance(data.response.response_text);
        window.speechSynthesis.speak(utterance);

      } catch (e) {
        console.error(e);
        setTranscription("Error processing voice.");
        setProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 h-full">
      <div className="relative">
        {/* Pulsing Effects */}
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping duration-1000"></div>
            <div className="absolute -inset-4 rounded-full bg-red-500/10 animate-pulse duration-1500"></div>
          </>
        )}

        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${isRecording ? 'scale-110' : 'hover:scale-105 hover:border-primary/50'}`}
          onClick={startRecording}
          disabled={isRecording || processing}
        >
          {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </Button>
      </div>

      <div className="text-center space-y-2 w-full max-w-xs">
        <p className="font-medium text-lg">
          {isRecording ? 'Listening...' : processing ? 'Processing...' : 'Tap to Speak'}
        </p>
        {isRecording && (
          <div className="flex justify-center items-center h-8 gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-[music-bar_1s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 20 + 5}px` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full space-y-4">
        {transcription && !isRecording && (
          <Card className="bg-muted/50 border-none shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">You</p>
              <p className="text-sm text-foreground">{transcription}</p>
            </CardContent>
          </Card>
        )}

        {response && (
          <Card className="bg-primary/5 border-primary/20 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-primary" />
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">Innovgenius</p>
              </div>
              <p className="text-sm text-foreground">{response}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
