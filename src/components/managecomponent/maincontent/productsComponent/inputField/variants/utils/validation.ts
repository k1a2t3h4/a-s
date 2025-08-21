// @ts-nocheck
import { VariantCombination, VariantOption } from '../types';

export const validateMediaUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isSkuUnique = (
  sku: string,
  combinations: VariantCombination[],
  externalSkuSet?: Set<string>
): boolean => {
  if (!sku || !sku.trim()) return false;
  if (externalSkuSet && externalSkuSet.has(sku)) return false;
  for (let i = 0; i < combinations.length; i++) {
    if (combinations[i].sku === sku) return false;
  }
  return true;
};

export const validateVariants = (
  variantOptions: VariantOption[],
  variantCombinations: VariantCombination[]
) => {
  const errors: string[] = [];
  if (variantOptions.length > 0) {
    const emptyValueOption = variantOptions.find(v => v.name.trim() !== '' && v.values.length === 0);
    if (emptyValueOption) {
      errors.push(`Variant option "${emptyValueOption.name}" must have at least one value.`);
    }
    for (let i = 0; i < variantCombinations.length; i++) {
      const combo = variantCombinations[i];
      if (!combo.price || isNaN(Number(combo.price)) || Number(combo.price) < 0) {
        errors.push(`Price is required and must be 0 or a positive number for combination #${i + 1}.`);
      }
      if (combo.trackQuantity) {
        if (!combo.availableQuantity || isNaN(Number(combo.availableQuantity)) || Number(combo.availableQuantity) < 0) {
          errors.push(`Available quantity is required and must be 0 or a positive number for combination #${i + 1} when track quantity is enabled.`);
        }
      }
      if (typeof combo.trackQuantity !== 'boolean') {
        errors.push(`Track quantity must be set for combination #${i + 1}.`);
      }
    }
  }
  return { isValid: errors.length === 0, errors };
};


