import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

const defaultWeightUnits = ['kg', 'g', 'lb', 'oz'];
const defaultDimensionUnits = ['cm', 'mm', 'm', 'in', 'ft'];

export const PhysicalProductFields = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    if (field === 'weight' && value && parseFloat(value) < 0) {
      newErrors[field] = 'Weight must be positive';
    } else if (field === 'height' && value && parseFloat(value) < 0) {
      newErrors[field] = 'Height must be positive';
    } else if (field === 'breadth' && value && parseFloat(value) < 0) {
      newErrors[field] = 'Breadth must be positive';
    } else if (field === 'length' && value && parseFloat(value) < 0) {
      newErrors[field] = 'Length must be positive';
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
  };

  // Validation function for physical product fields
  const validatePhysicalProduct = () => {
    const errors: string[] = [];
    if (productFormData.isPhysical === true) {
      if (!productFormData.weight || isNaN(Number(productFormData.weight)) || Number(productFormData.weight) <= 0) {
        errors.push('Weight is required and must be a positive number.');
      }
      if (!productFormData.weightUnit || !defaultWeightUnits.includes(productFormData.weightUnit)) {
        errors.push('Weight unit is required.');
      }
      if (!productFormData.height || isNaN(Number(productFormData.height)) || Number(productFormData.height) < 0) {
        errors.push('Height is required and must be 0 or a positive number.');
      }
      if (!productFormData.breadth || isNaN(Number(productFormData.breadth)) || Number(productFormData.breadth) < 0) {
        errors.push('Breadth is required and must be 0 or a positive number.');
      }
      if (!productFormData.length || isNaN(Number(productFormData.length)) || Number(productFormData.length) < 0) {
        errors.push('Length is required and must be 0 or a positive number.');
      }
      if (!productFormData.dimensionUnit || !defaultDimensionUnits.includes(productFormData.dimensionUnit)) {
        errors.push('Dimension unit is required.');
      }
    }
    // Optionally, call a validation callback here
    return errors.length === 0;
  };

  useEffect(() => {
    validatePhysicalProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productFormData.isPhysical,
    productFormData.weight,
    productFormData.weightUnit,
    productFormData.height,
    productFormData.breadth,
    productFormData.length,
    productFormData.dimensionUnit
  ]);

  const handleChange = (field: string, value: string | boolean) => {
    validateField(field, String(value));
    setProductFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Switch
            checked={!!productFormData.isPhysical}
            onCheckedChange={(checked) => handleChange('isPhysical', checked)}
            id="isPhysical"
          />
          <Label htmlFor="isPhysical">Is Physical Product?</Label>
        </div>
        {productFormData.isPhysical && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Weight</Label>
                <Input
                  type="number"
                  value={productFormData?.weight || ''}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Enter weight"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && (
                  <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                )}
              </div>
              <div>
                <Label>Weight Unit</Label>
                <Select
                  value={productFormData?.weightUnit || 'kg'}
                  onValueChange={(value) => handleChange('weightUnit', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultWeightUnits.map((unit: string) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <Label>Height</Label>
                <Input
                  type="number"
                  value={productFormData?.height || ''}
                  onChange={(e) => handleChange('height', e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Height"
                  className={errors.height ? 'border-red-500' : ''}
                />
                {errors.height && (
                  <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                )}
              </div>
              <div>
                <Label>Breadth</Label>
                <Input
                  type="number"
                  value={productFormData?.breadth || ''}
                  onChange={(e) => handleChange('breadth', e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Breadth"
                  className={errors.breadth ? 'border-red-500' : ''}
                />
                {errors.breadth && (
                  <p className="text-red-500 text-xs mt-1">{errors.breadth}</p>
                )}
              </div>
              <div>
                <Label>Length</Label>
                <Input
                  type="number"
                  value={productFormData?.length || ''}
                  onChange={(e) => handleChange('length', e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Length"
                  className={errors.length ? 'border-red-500' : ''}
                />
                {errors.length && (
                  <p className="text-red-500 text-xs mt-1">{errors.length}</p>
                )}
              </div>
              <div>
                <Label>Dimension Unit</Label>
                <Select
                  value={productFormData?.dimensionUnit || 'cm'}
                  onValueChange={(value) => handleChange('dimensionUnit', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultDimensionUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Volume Summary */}
            {productFormData?.height && productFormData?.breadth && productFormData?.length && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Calculated Volume</Label>
                <p className="text-sm text-gray-600 mt-1">
                  {calculateVolume(productFormData.height, productFormData.breadth, productFormData.length, productFormData.dimensionUnit)}
                </p>
              </div>
            )}
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="hasHSCode"
                  checked={!!productFormData.hasHSCode}
                  onCheckedChange={(checked) => handleChange('hasHSCode', checked)}
                />
                <Label htmlFor="hasHSCode">This product has an HS code</Label>
              </div>
              {productFormData.hasHSCode && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Country/Region of origin</Label>
                    <Select
                      value={productFormData?.countryOfOrigin || ''}
                      onValueChange={(value) => handleChange('countryOfOrigin', value)}
                    >
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
                    <Input
                      value={productFormData?.hsCode || ''}
                      onChange={(e) => handleChange('hsCode', e.target.value)}
                      placeholder="Search by product keyword or code"
                    />
                    <p className="text-sm text-blue-600 mt-1">Learn more about adding HS codes</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to calculate volume
const calculateVolume = (height: string, breadth: string, length: string, unit: string): string => {
  const h = parseFloat(height);
  const b = parseFloat(breadth);
  const l = parseFloat(length);
  if (isNaN(h) || isNaN(b) || isNaN(l)) return '';
  const volume = h * b * l;
  const unitSuffix = unit === 'cm' ? 'cm³' : unit === 'mm' ? 'mm³' : unit === 'm' ? 'm³' : unit === 'in' ? 'in³' : 'ft³';
  return `${volume.toFixed(2)} ${unitSuffix}`;
}; 