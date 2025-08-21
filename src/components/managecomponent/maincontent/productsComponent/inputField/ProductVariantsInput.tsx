import ProductVariants from './variants/ProductVariants';
import { ProductVariantProvider } from '../../../../contexts/ProductVariantProvider';

export const ProductVariantsInput = () => {
  return (
    <ProductVariantProvider>
      <ProductVariants />
    </ProductVariantProvider>
  );
};
