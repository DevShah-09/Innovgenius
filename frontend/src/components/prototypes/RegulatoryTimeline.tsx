import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

export default function RegulatoryTimeline() {
  const events = [
    { date: "Mar 01, 2026", event: "AI Act Enforcement", impact: "High", color: "red" },
    { date: "Apr 15, 2026", event: "Digital ID Framework", impact: "Medium", color: "blue" },
    { date: "Jun 01, 2026", event: "Data Privacy Amend.", impact: "Low", color: "gray" },
  ];

  return (
    <Card className="w-full border-t-4 border-t-orange-500 shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-orange-500" />
          Regulatory Timeline
        </CardTitle>
        <CardDescription>Upcoming compliance deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-muted ml-2 space-y-6 my-2">
          {events.map((evt, idx) => (
            <div key={idx} className="ml-6 relative">
              <span className={`absolute flex items-center justify-center w-3 h-3 rounded-full -left-[31px] ring-4 ring-background ${evt.color === 'red' ? 'bg-red-500' : evt.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{evt.date}</span>
                <h3 className="text-sm font-bold text-foreground mt-0.5">{evt.event}</h3>
                <div className="mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${evt.impact === 'High' ? 'bg-red-100 text-red-700' :
                      evt.impact === 'Medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {evt.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
