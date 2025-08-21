// @ts-nocheck

export type VariantOption = {
  id: string;
  name: string;
  values: string[];
};

export type VariantMediaType = 'image' | 'video' | 'gif';

export type VariantMediaItem = {
  type: VariantMediaType;
  url: string;
  name?: string;
};

export type VariantCombination = {
  combination: Record<string, string>;
  varientId: string;
  varientmedia: VariantMediaItem[];
  image: string;
  enabled: boolean;
  price: string;
  compareAtPrice: string;
  costPerItem: string;
  profit: string;
  margin: string;
  trackQuantity: boolean;
  availableQuantity: string;
  shopLocation: string;
  continueSellingOutOfStock: boolean;
  hasSKUBarcode: boolean;
  sku: string;
  barcode: string;
  isPhysical: boolean;
  weight: string;
  weightUnit: 'kg' | 'g' | 'lb' | 'oz';
  height: string;
  breadth: string;
  length: string;
  dimensionUnit: 'cm' | 'mm' | 'm' | 'in' | 'ft';
  hasHSCode: boolean;
  countryOfOrigin: string;
  hsCode: string;
  vendor?: string;
};

export type MediaState = {
  currentMediaUrl?: string;
  currentMediaType?: VariantMediaType;
};


