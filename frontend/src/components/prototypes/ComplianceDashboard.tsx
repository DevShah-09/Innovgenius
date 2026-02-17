import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ComplianceDashboard() {
  const rules = [
    { id: 1, name: "KYC - AML Global", status: "passed", region: "Global", count: "124/124" },
    { id: 2, name: "GDPR Consent", status: "passed", region: "EU", count: "100%" },
    { id: 3, name: "CCPA Data Retention", status: "warning", region: "US-CA", count: "Pending" },
  ];

  return (
    <Card className="w-full border-t-4 border-t-purple-500 shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-lg">Compliance Intelligence</CardTitle>
        <CardDescription>Real-time regulatory monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-center">
            <div className="text-2xl font-bold text-purple-700">98%</div>
            <div className="text-[10px] text-purple-600 uppercase font-semibold">Pass Rate</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-center">
            <div className="text-2xl font-bold text-indigo-700">3</div>
            <div className="text-[10px] text-indigo-600 uppercase font-semibold">Active Alerts</div>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-2.5 rounded-md hover:bg-muted/50 transition-colors border border-transparent hover:border-muted-foreground/10">
              <div className="flex items-center gap-3">
                {rule.status === 'passed' ? (
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium leading-none">{rule.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{rule.region}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs font-mono">{rule.count}</Badge>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-purple-600">Insight:</span> New CA regulation effective next week.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
