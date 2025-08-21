import React from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const ProductInventoryInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const handleChange = (field: string, value: string | boolean) => {
    setProductFormData((prev: any) => ({ ...prev, [field]: value }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="track-quantity"
            checked={productFormData?.trackQuantity || false}
            onCheckedChange={(checked) => handleChange('trackQuantity', checked)}
          />
          <Label htmlFor="track-quantity">Track quantity</Label>
        </div>
        {productFormData?.trackQuantity && (
          <>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={productFormData?.availableQuantity || ''}
                onChange={(e) => handleChange('availableQuantity', e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label>Shop location</Label>
              <Input
                type="number"
                value={productFormData?.shopLocation || '0'}
                onChange={(e) => handleChange('shopLocation', e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </>
        )}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="continue-selling"
            checked={productFormData?.continueSellingOutOfStock || false}
            onCheckedChange={(checked) => handleChange('continueSellingOutOfStock', checked)}
          />
          <div>
            <Label htmlFor="continue-selling">Continue selling when out of stock</Label>
            <p className="text-sm text-gray-500 mt-1">
              This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="has-sku-barcode"
            checked={productFormData?.hasSKUBarcode || false}
            onCheckedChange={(checked) => handleChange('hasSKUBarcode', checked)}
          />
          <Label htmlFor="has-sku-barcode">This product has a SKU or barcode</Label>
        </div>
        {productFormData?.hasSKUBarcode && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>SKU (Stock Keeping Unit)</Label>
              <Input
                value={productFormData?.sku || ''}
                onChange={(e) => handleChange('sku', e.target.value)}
                placeholder="Enter SKU"
              />
            </div>
            <div>
              <Label>Barcode (ISBN, UPC, GTIN, etc.)</Label>
              <Input
                value={productFormData?.barcode || ''}
                onChange={(e) => handleChange('barcode', e.target.value)}
                placeholder="Enter barcode"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 