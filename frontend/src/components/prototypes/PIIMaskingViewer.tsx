'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function PIIMaskingViewer() {
  const [showUnmasked, setShowUnmasked] = useState(false);

  const data = {
    name: "Jane Doe",
    id: "A12345678",
    address: "123 Privacy Lane, Secret City",
    ssn: "XXX-XX-1234"
  };

  const mask = (text: string) => text.replace(/./g, '•');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg">
          Automated PII Masking
          <div className="flex items-center space-x-2">
            <Switch id="mask-mode" checked={showUnmasked} onCheckedChange={setShowUnmasked} />
            <Label htmlFor="mask-mode" className="text-xs">
              {showUnmasked ? 'Unmasked (Admin)' : 'Masked (Default)'}
            </Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-semibold">Full Name:</div>
          <div className={showUnmasked ? "text-red-600" : "text-gray-600"}>
            {showUnmasked ? data.name : mask(data.name)}
          </div>

          <div className="font-semibold">Document ID:</div>
          <div className={showUnmasked ? "text-red-600" : "text-gray-600"}>
            {showUnmasked ? data.id : mask(data.id)}
          </div>

          <div className="font-semibold">Address:</div>
          <div className={showUnmasked ? "text-red-600" : "text-gray-600"}>
            {showUnmasked ? data.address : mask(data.address)}
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400 italic">
          * PII is automatically redacted for non-privileged users.
        </div>
      </CardContent>
    </Card>
  );
}
