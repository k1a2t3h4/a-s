// @ts-nocheck
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
  price: string;
  compareAtPrice: string;
  costPerItem: string;
  onChangePrice: (v: string) => void;
  onChangeCompareAt: (v: string) => void;
  onChangeCostPerItem: (v: string) => void;
};

const PricingSection: React.FC<Props> = ({ price, compareAtPrice, costPerItem, onChangePrice, onChangeCompareAt, onChangeCostPerItem }) => {
  const profit = (() => {
    const p = parseFloat(price || '0');
    const c = parseFloat(costPerItem || '0');
    return p > 0 && c > 0 ? (p - c).toFixed(2) : '--';
  })();
  const margin = (() => {
    const p = parseFloat(price || '0');
    const c = parseFloat(costPerItem || '0');
    if (p > 0 && c > 0) {
      const pf = p - c;
      return ((pf / p) * 100).toFixed(1) + '%';
    }
    return '--';
  })();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <Label>Price</Label>
          <Input type="number" value={price || ''} onChange={(e) => onChangePrice(e.target.value)} placeholder="0.00" step="0.01" min="0" />
        </div>
        <div>
          <Label>Compare-at price</Label>
          <Input type="number" value={compareAtPrice || ''} onChange={(e) => onChangeCompareAt(e.target.value)} placeholder="0.00" step="0.01" min="0" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Cost per item</Label>
          <Input type="number" value={costPerItem || ''} onChange={(e) => onChangeCostPerItem(e.target.value)} placeholder="0.00" step="0.01" min="0" />
        </div>
        <div>
          <Label>Profit</Label>
          <Input value={profit} disabled className="bg-gray-100" />
        </div>
        <div>
          <Label>Margin</Label>
          <Input value={margin} disabled className="bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;


