'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, FileText, X, CheckCircle2, File, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  onAnalysisComplete: (data: any) => void;
}

export default function DocumentUpload({ onAnalysisComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        toast.error('Invalid file type', {
          description: 'Please upload an image or PDF file.'
        });
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (uploading) return;
    setFile(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(10); // Start progress

    // Simulate progress for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          // Keep it at 90 until actually finished
          return 90;
        }
        return prev + 10;
      });
    }, 400);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Note: Ensure the backend URL is correct and accessible
      const response = await fetch('http://localhost:8000/ocr/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      toast.success("Document analyzed successfully!", {
        description: "Risk assessment is ready for review."
      });

      // Delay slightly to show 100%
      setTimeout(() => {
        onAnalysisComplete(data);
        setUploading(false); // Reset uploading state or keep it depending on flow
      }, 500);

    } catch (err) {
      clearInterval(interval);
      toast.error("Failed to process document", {
        description: err instanceof Error ? err.message : "Please try again likely server is not running."
      });
      console.error(err);
      setProgress(0);
      setUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    return <File className="w-8 h-8 text-blue-500" />;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ease-in-out cursor-pointer overflow-hidden",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer z-10" />

          <div className="flex flex-col items-center justify-center space-y-4 relative z-0">
            <div className={cn(
              "p-4 rounded-full bg-muted transition-colors duration-300",
              isDragging ? "bg-primary/20" : "group-hover:bg-muted/80"
            )}>
              <UploadCloud className={cn(
                "w-10 h-10 transition-colors duration-300",
                isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">
                Strategies to identify risk (PDF, JPG, PNG - max 10MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border shadow-md overflow-hidden bg-background/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  {getFileIcon(file.name)}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {!uploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {uploading || progress > 0 ? (
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {progress === 100 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Analysis Complete
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Document...
                      </>
                    )}
                  </span>
                  <span className="text-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <div className="mt-6 flex justify-end">
                <Button onClick={handleUpload} className="w-full sm:w-auto font-semibold shadow-sm">
                  Analyze Risk
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
