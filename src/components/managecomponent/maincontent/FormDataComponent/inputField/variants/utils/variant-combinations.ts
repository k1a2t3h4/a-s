// @ts-nocheck
import { VariantCombination, VariantOption } from '../types';
import { nanoid } from 'nanoid';

export const generateNextProductId = () => `V${nanoid()}`;

export const hasVariantOptionsChanged = (current: VariantOption[], previous: VariantOption[]): boolean => {
  if (current.length !== previous.length) return true;
  for (let i = 0; i < current.length; i++) {
    const c = current[i];
    const p = previous[i];
    if (!p) return true;
    if (c.name !== p.name) return true;
    if (c.values.length !== p.values.length) return true;
    for (let j = 0; j < c.values.length; j++) {
      if (c.values[j] !== p.values[j]) return true;
    }
  }
  return false;
};

export const generateSmartVariantCombinations = (
  options: VariantOption[],
  existingCombinations: VariantCombination[],
  firstVendorName: string
): VariantCombination[] => {
  if (!options || options.length === 0) return [];
  const newCombinations: VariantCombination[] = [];
  const existingMap = new Map<string, VariantCombination>();
  existingCombinations.forEach(combo => {
    const key = JSON.stringify(combo.combination);
    existingMap.set(key, combo);
  });

  function generate(opts: VariantOption[], currentCombo: Record<string, string> = {}, index: number = 0) {
    if (index === opts.length) {
      const key = JSON.stringify(currentCombo);
      const existing = existingMap.get(key);
      if (existing) {
        newCombinations.push(existing);
      } else {
        newCombinations.push({
          combination: { ...currentCombo },
          varientId: generateNextProductId(),
          varientmedia: [],
          image: '',
          enabled: true,
          price: '',
          compareAtPrice: '',
          costPerItem: '',
          profit: '',
          margin: '',
          trackQuantity: true,
          availableQuantity: '',
          shopLocation: '',
          continueSellingOutOfStock: false,
          hasSKUBarcode: false,
          sku: '',
          barcode: '',
          isPhysical: false,
          weight: '',
          weightUnit: 'kg',
          height: '',
          breadth: '',
          length: '',
          dimensionUnit: 'cm',
          hasHSCode: false,
          countryOfOrigin: '',
          hsCode: '',
          vendor: firstVendorName,
        });
      }
      return;
    }
    const option = opts[index];
    for (const value of option.values) {
      generate(opts, { ...currentCombo, [option.name]: value }, index + 1);
    }
  }
  generate(options);
  return newCombinations;
};


