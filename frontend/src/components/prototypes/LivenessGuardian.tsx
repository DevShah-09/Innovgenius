'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, ShieldAlert, ScanFace, Activity, CheckCircle } from 'lucide-react';

export default function LivenessGuardian() {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full border-t-4 border-t-blue-500 shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <div className="flex items-center gap-2">
            <ScanFace className="w-5 h-5 text-blue-500" />
            Liveness Check
          </div>
          <Badge variant={scanning ? "secondary" : "outline"} className={scanning ? "animate-pulse bg-blue-100 text-blue-700" : "text-green-600 border-green-200 bg-green-50"}>
            {scanning ? "Scanning..." : "Verified"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {scanning ? (
          <div className="space-y-4">
            <div className="flex justify-center py-4">
              <div className="relative">
                <ScanFace className="w-16 h-16 text-blue-200 animate-pulse" />
                <div className="absolute inset-0 border-t-2 border-blue-500 animate-[scan_1.5s_ease-in-out_infinite] top-0"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Analyzing micro-expressions...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-900">Biometric Verified</span>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">99.8%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-900">Deepfake Probability</span>
                </div>
                <span className="text-sm font-bold text-blue-700">0.02%</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-4 flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Liveness confirmed via WebAuthn
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
