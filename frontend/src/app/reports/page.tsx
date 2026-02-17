'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Compliance</h1>
        <p className="text-muted-foreground">
          Generate audit logs and compliance reports.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Select report type and date range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" /> Daily Risk Summary
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" /> Monthly Audit Log
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" /> Failed KYCs Export
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Reports</CardTitle>
                <Button variant="ghost" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Feb 2026_Audit_Log.pdf', date: 'Feb 17, 2026', size: '2.4 MB' },
                  { name: 'Daily_Risk_Summary_Feb17.pdf', date: 'Feb 17, 2026', size: '1.1 MB' },
                  { name: 'Compliance_Review_Q1.pdf', date: 'Feb 15, 2026', size: '5.6 MB' },
                  { name: 'User_Activity_Log.csv', date: 'Feb 14, 2026', size: '845 KB' },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
