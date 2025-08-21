import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const ProductPricingInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [profit, setProfit] = useState('--');
  const [margin, setMargin] = useState('--');

  useEffect(() => {
    const price = parseFloat(productFormData?.price || '0');
    const cost = parseFloat(productFormData?.costPerItem || '0');
    if (price > 0 && cost > 0) {
      const calculatedProfit = price - cost;
      const calculatedMargin = ((calculatedProfit / price) * 100);
      setProfit(calculatedProfit.toFixed(2));
      setMargin(calculatedMargin.toFixed(1) + '%');
    } else {
      setProfit('--');
      setMargin('--');
    }
  }, [productFormData?.price, productFormData?.costPerItem]);

  const handleChange = (field: string, value: string | boolean) => {
    setProductFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <Input
                type="number"
                value={productFormData?.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
                className="pl-8"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div>
            <Label>Compare-at price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <Input
                type="number"
                value={productFormData?.compareAtPrice || ''}
                onChange={(e) => handleChange('compareAtPrice', e.target.value)}
                placeholder="0.00"
                className="pl-8"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="charge-tax"
            checked={productFormData?.chargeTax || false}
            onCheckedChange={(checked) => handleChange('chargeTax', checked)}
          />
          <Label htmlFor="charge-tax">Charge tax on this product</Label>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Cost per item</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <Input
                type="number"
                value={productFormData?.costPerItem || ''}
                onChange={(e) => handleChange('costPerItem', e.target.value)}
                placeholder="0.00"
                className="pl-8"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div>
            <Label>Profit</Label>
            <Input
              value={profit}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div>
            <Label>Margin</Label>
            <Input
              value={margin}
              disabled
              className="bg-gray-100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 