import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskScoreCardProps {
  riskData: {
    risk_score: number;
    risk_level: string;
    flags: string[];
  } | null;
}

export default function RiskScoreCard({ riskData }: RiskScoreCardProps) {
  if (!riskData) return null;

  const { risk_score, risk_level, flags } = riskData;

  const getRiskConfig = (level: string) => {
    switch (level.toUpperCase()) {
      case 'LOW':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          badgeParams: 'bg-green-600 hover:bg-green-700',
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          description: 'Low risk detected. No immediate action required.',
        };
      case 'MEDIUM':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          badgeParams: 'bg-yellow-600 hover:bg-yellow-700',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
          description: 'Medium risk. Review highlighted flags carefully.',
        };
      case 'HIGH':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          borderColor: 'border-orange-200',
          badgeParams: 'bg-orange-600 hover:bg-orange-700',
          icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
          description: 'High risk detected. Enhanced due diligence recommended.',
        };
      case 'CRITICAL':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          badgeParams: 'bg-red-700 hover:bg-red-800',
          icon: <ShieldAlert className="h-5 w-5 text-red-700" />,
          description: 'Critical risk. Immediate rejection or escalation advised.',
        };
      default:
        return {
          color: 'text-slate-600',
          bgColor: 'bg-slate-100',
          borderColor: 'border-slate-200',
          badgeParams: 'bg-slate-600 hover:bg-slate-700',
          icon: <AlertCircle className="h-5 w-5 text-slate-600" />,
          description: 'Risk assessment complete.',
        };
    }
  };

  const config = getRiskConfig(risk_level);

  return (
    <Card className={cn("w-full max-w-md mx-auto mt-6 shadow-lg border-2", config.borderColor)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl">
          <div className="flex items-center gap-2">
            {config.icon}
            <span>Risk Assessment</span>
          </div>
          <Badge className={cn("px-3 py-1 text-sm font-semibold", config.badgeParams)}>
            {risk_level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-4 relative">
          {/* Simple circular visualization using CSS or SVG could be added here, using Progress for now */}
          <div className="w-full flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-muted-foreground">Score</span>
            <span className={cn("text-3xl font-bold", config.color)}>{risk_score}<span className="text-lg text-muted-foreground">/100</span></span>
          </div>
          <Progress value={risk_score} className={cn("h-3 w-full [&>[data-slot=progress-indicator]]:bg-current", config.color)} />
          <p className="mt-4 text-center text-sm text-muted-foreground font-medium">
            {config.description}
          </p>
        </div>

        {flags && flags.length > 0 && (
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-semibold text-sm mb-3 text-slate-700 uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Risk Flags
            </h4>
            <div className="flex flex-wrap gap-2">
              {flags.map((flag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors py-1 px-3"
                >
                  {flag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
