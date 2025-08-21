// @ts-nocheck
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
  hasHSCode: boolean;
  countryOfOrigin: string;
  hsCode: string;
  onChangeHasHSCode: (v: boolean) => void;
  onChangeCountryOfOrigin: (v: string) => void;
  onChangeHsCode: (v: string) => void;
};

const HsSection: React.FC<Props> = ({ hasHSCode, countryOfOrigin, hsCode, onChangeHasHSCode, onChangeCountryOfOrigin, onChangeHsCode }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-2">
        <Checkbox id="hasHSCode" checked={hasHSCode || false} onCheckedChange={(checked) => onChangeHasHSCode(!!checked)} />
        <Label htmlFor="hasHSCode">This product has an HS code</Label>
      </div>
      {hasHSCode && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Country/Region of origin</Label>
            <Select value={countryOfOrigin || ''} onValueChange={(value) => onChangeCountryOfOrigin(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Harmonized System (HS) code</Label>
            <Input value={hsCode || ''} onChange={(e) => onChangeHsCode(e.target.value)} placeholder="Search by product keyword or code" />
            <p className="text-sm text-blue-600 mt-1">Learn more about adding HS codes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HsSection;


