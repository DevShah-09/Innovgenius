'use client';

import { useState } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import RiskScoreCard from '@/components/RiskScoreCard';
import ChatInterface from '@/components/ChatInterface';
import VoiceAssistant from '@/components/VoiceAssistant';
import LivenessGuardian from '@/components/prototypes/LivenessGuardian';
import ComplianceDashboard from '@/components/prototypes/ComplianceDashboard';
import RegulatoryTimeline from '@/components/prototypes/RegulatoryTimeline';
import PIIMaskingViewer from '@/components/prototypes/PIIMaskingViewer';
import GuidedJourney from '@/components/prototypes/GuidedJourney';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Upload, Activity, FileText } from 'lucide-react';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysisComplete = (data: any) => {
    console.log("Analysis Data:", data);
    setAnalysisResult(data);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor onboarding risks and compliance in real-time.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
            <Activity className="w-3 h-3 mr-2" />
            System Operational
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-12 h-full">

        {/* Left Column: Upload, Voice & Live Analysis (7 cols) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Document Ingestion</CardTitle>
                  <CardDescription>Upload KYC documents for instant risk analysis.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DocumentUpload onAnalysisComplete={handleAnalysisComplete} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voice Command</CardTitle>
              <CardDescription>Hands-free navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <VoiceAssistant />
            </CardContent>
          </Card>

          {analysisResult && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  {analysisResult.risk && (
                    <RiskScoreCard riskData={analysisResult.risk} />
                  )}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-lg">Extracted Data</CardTitle>
                  </div>
                  <CardDescription>OCR Output from processed documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <pre className="text-xs text-muted-foreground overflow-auto max-h-60 font-mono">
                      {JSON.stringify(analysisResult.ocr, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Column: Assistant & Actions (5 cols) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Card className="flex flex-col h-[700px] border-none shadow-md bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="border-b bg-card rounded-t-xl">
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Chat for clarifications and guidance</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden bg-card rounded-b-xl">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Phase 2 Prototypes */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight">Advanced Features</h3>
            <p className="text-sm text-muted-foreground">Experimental prototypes for Phase 2</p>
          </div>
          <Badge variant="secondary" className="px-4 py-1">Prototype Phase</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group hover:border-primary/50 transition-colors duration-300 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6"><LivenessGuardian /></div>
          </div>
          <div className="group hover:border-primary/50 transition-colors duration-300 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6"><ComplianceDashboard /></div>
          </div>
          <div className="group hover:border-primary/50 transition-colors duration-300 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6"><RegulatoryTimeline /></div>
          </div>
          <div className="group hover:border-primary/50 transition-colors duration-300 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6"><PIIMaskingViewer /></div>
          </div>
          <div className="group hover:border-primary/50 transition-colors duration-300 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6"><GuidedJourney /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

