'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, AlertTriangle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-muted-foreground">
          Historical risk assessments and detailed investigation tools.
        </p>
      </div>
      <Separator />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assessments..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Data */}
        {[
          { id: 'Risk-2024-001', score: 12, level: 'LOW', date: 'Just now', user: 'John Doe' },
          { id: 'Risk-2024-002', score: 85, level: 'HIGH', date: '2 hours ago', user: 'Jane Smith' },
          { id: 'Risk-2024-003', score: 45, level: 'MEDIUM', date: '5 hours ago', user: 'Robert Brown' },
          { id: 'Risk-2024-004', score: 92, level: 'CRITICAL', date: '1 day ago', user: 'Alice Johnson' },
          { id: 'Risk-2024-005', score: 5, level: 'LOW', date: '1 day ago', user: 'Michael Wilson' },
        ].map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium">{item.user}</CardTitle>
                <Badge variant="outline" className={
                  item.level === 'LOW' ? 'text-green-600 bg-green-50 border-green-200' :
                    item.level === 'MEDIUM' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                      item.level === 'HIGH' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                        'text-red-600 bg-red-50 border-red-200'
                }>{item.level}</Badge>
              </div>
              <CardDescription className="text-xs">{item.id} • {item.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  {item.level === 'LOW' ? <ShieldCheck className="w-5 h-5 text-green-500" /> :
                    item.level === 'CRITICAL' || item.level === 'HIGH' ? <ShieldAlert className="w-5 h-5 text-red-500" /> :
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
                </div>
                <span className="text-2xl font-bold">{item.score}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
