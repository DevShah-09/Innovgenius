'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function GuidedJourney() {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <Card className={`w-full transition-colors ${highContrast ? 'bg-black text-yellow-400 border-yellow-400' : ''}`}>
      <CardHeader>
        <CardTitle className="text-lg flex justify-between">
          Guided Journey & Accessibility
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHighContrast(!highContrast)}
            className={highContrast ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-900' : ''}
          >
            {highContrast ? 'Disable HC' : 'Enable High Contrast'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="p-4 border rounded mb-2 relative group">
          <p className="text-sm">User Step: Review Document</p>

          {/* Mock Floating Guide */}
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            ? Guide: Check for expiry date
          </div>
        </div>

        <div className="text-xs mt-2">
          {highContrast ? 'High Contrast Mode Active - WCAG AAA Compliant' : 'Hover over elements for smart tooltips.'}
        </div>
      </CardContent>
    </Card>
  );
}
