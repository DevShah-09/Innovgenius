'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DocumentUpload from '@/components/DocumentUpload';

export default function UploadPage() {
  const handleAnalysisComplete = (data: any) => {
    console.log("Analysis Data:", data);
    // In a real app, we might redirect to results or show a modal
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Document Upload</h1>
        <p className="text-muted-foreground">
          Upload KYC and identity documents for instant AI-powered risk analysis.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <Card className="border-t-4 border-t-primary shadow-md">
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Supported formats: PDF, JPG, PNG. Max size: 10MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUpload onAnalysisComplete={handleAnalysisComplete} />
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Automatic OCR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Extracts names, dates, and ID numbers automatically with high accuracy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Flagging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Identifies potential tampering, mismatches, and blacklisted entities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
