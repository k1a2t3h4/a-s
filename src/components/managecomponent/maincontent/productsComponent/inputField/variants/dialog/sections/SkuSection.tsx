// @ts-nocheck
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
  hasSKUBarcode: boolean;
  sku: string;
  barcode: string;
  skuError?: string;
  onChangeHasSKUBarcode: (v: boolean) => void;
  onChangeSku: (v: string) => void;
  onChangeBarcode: (v: string) => void;
};

const SkuSection: React.FC<Props> = ({ hasSKUBarcode, sku, barcode, skuError, onChangeHasSKUBarcode, onChangeSku, onChangeBarcode }) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Checkbox id="has-sku-barcode" checked={hasSKUBarcode || false} onCheckedChange={(checked) => onChangeHasSKUBarcode(!!checked)} />
        <Label htmlFor="has-sku-barcode">This product has a SKU or barcode</Label>
      </div>
      {hasSKUBarcode && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>SKU (Stock Keeping Unit)</Label>
            <Input value={sku || ''} onChange={(e) => onChangeSku(e.target.value)} placeholder="Enter SKU" />
            {!!skuError && <p className="text-red-500 text-xs mt-1">{skuError}</p>}
          </div>
          <div>
            <Label>Barcode (ISBN, UPC, GTIN, etc.)</Label>
            <Input value={barcode || ''} onChange={(e) => onChangeBarcode(e.target.value)} placeholder="Enter barcode" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkuSection;


