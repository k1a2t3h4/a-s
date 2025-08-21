// @ts-nocheck
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
  isPhysical: boolean;
  weight: string;
  weightUnit: 'kg'|'g'|'lb'|'oz';
  height: string;
  breadth: string;
  length: string;
  dimensionUnit: 'cm'|'mm'|'m'|'in'|'ft';
  onChangeIsPhysical: (v: boolean) => void;
  onChangeWeight: (v: string) => void;
  onChangeWeightUnit: (v: any) => void;
  onChangeHeight: (v: string) => void;
  onChangeBreadth: (v: string) => void;
  onChangeLength: (v: string) => void;
  onChangeDimensionUnit: (v: any) => void;
};

const PhysicalSection: React.FC<Props> = ({ isPhysical, weight, weightUnit, height, breadth, length, dimensionUnit, onChangeIsPhysical, onChangeWeight, onChangeWeightUnit, onChangeHeight, onChangeBreadth, onChangeLength, onChangeDimensionUnit }) => {
  const volumeText = (() => {
    const h = parseFloat(height);
    const b = parseFloat(breadth);
    const l = parseFloat(length);
    if (isNaN(h) || isNaN(b) || isNaN(l)) return '';
    const vol = h * b * l;
    const unit = dimensionUnit;
    const unitSuffix = unit === 'cm' ? 'cm³' : unit === 'mm' ? 'mm³' : unit === 'm' ? 'm³' : unit === 'in' ? 'in³' : 'ft³';
    return `${vol.toFixed(2)} ${unitSuffix}`;
  })();

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Checkbox id="isPhysical" checked={isPhysical || false} onCheckedChange={(checked) => onChangeIsPhysical(!!checked)} />
        <Label htmlFor="isPhysical">Is Physical Product?</Label>
      </div>
      {isPhysical && (
        <>
          <div className="grid grid-cols-2 gap-6 mb-2">
            <div>
              <Label>Weight</Label>
              <Input type="number" value={weight || ''} onChange={(e) => onChangeWeight(e.target.value)} min="0" step="0.01" placeholder="Enter weight" />
            </div>
            <div>
              <Label>Weight Unit</Label>
              <Select value={weightUnit || 'kg'} onValueChange={(value) => onChangeWeightUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-2">
            <div>
              <Label>Height</Label>
              <Input type="number" value={height || ''} onChange={(e) => onChangeHeight(e.target.value)} min="0" step="0.01" placeholder="Height" />
            </div>
            <div>
              <Label>Breadth</Label>
              <Input type="number" value={breadth || ''} onChange={(e) => onChangeBreadth(e.target.value)} min="0" step="0.01" placeholder="Breadth" />
            </div>
            <div>
              <Label>Length</Label>
              <Input type="number" value={length || ''} onChange={(e) => onChangeLength(e.target.value)} min="0" step="0.01" placeholder="Length" />
            </div>
            <div>
              <Label>Dimension Unit</Label>
              <Select value={dimensionUnit || 'cm'} onValueChange={(value) => onChangeDimensionUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="mm">mm</SelectItem>
                  <SelectItem value="m">m</SelectItem>
                  <SelectItem value="in">in</SelectItem>
                  <SelectItem value="ft">ft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {height && breadth && length && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium">Calculated Volume</Label>
              <p className="text-sm text-gray-600 mt-1">{volumeText}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhysicalSection;


