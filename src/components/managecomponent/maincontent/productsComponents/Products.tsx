import { ProductProvider } from "../../../contexts/ProductContext";
import { ProductsTopicHolder } from "./ProductsTopicHolder";
import { ProductsDeliveryContent } from "./ProductsDeliveryContent";

export const Products = () => {
  return (
    <ProductProvider>
      <ProductsInner />
    </ProductProvider>
  );
};

const ProductsInner = () => {
  return (
    <div class="flex flex-col h-full min-h-0">
      <ProductsTopicHolder />
      <div class="flex-1 min-h-0 overflow-hidden">
        <ProductsDeliveryContent />
      </div>
    </div>
  );
};
