// src/components/products/ProductsDeliveryContent.tsx
import { type Component, createSignal, createEffect, onCleanup } from "solid-js";
import { ProductsTable } from "./ProductsTable";
// import { InventoryManagement } from "./InventoryManagement";
import { ProductDetails } from "./ProductDetails";
// import { ProductVariants } from "./ProductVariants";
// import { ProductMedia } from "./ProductMedia";
// import { ProductOrders } from "./ProductOrders";
// import { ProductAnalytics } from "./ProductAnalytics";
// import { ProductCollections } from "./ProductCollections";
import { useProductContext } from "../../../contexts/ProductContext";

export const ProductsDeliveryContent: Component = () => {
  const { selectedTopic, selectedProduct } = useProductContext();

  const [triggerAddProduct, setTriggerAddProduct] = createSignal(false);

  // Reset trigger when product changes
  createEffect(() => {
    if (triggerAddProduct() && selectedProduct()) {
      const timer = setTimeout(() => setTriggerAddProduct(false), 100);
      onCleanup(() => clearTimeout(timer));
    }
  });

  const renderContent = () => {
    // Handle product-specific topics
    if (selectedProduct() || selectedTopic() === "productdetails") {
      switch (selectedTopic()) {
        case "productdetails":
          return <ProductDetails />;
        // case "variants":
        //   return selectedProduct() ? (
        //     <ProductVariants productId={selectedProduct()} />
        //   ) : (
        //     <div class="p-4 sm:p-6">
        //       Please save the product first to manage variants.
        //     </div>
        //   );
        // case "inventory":
        //   return selectedProduct() ? (
        //     <InventoryManagement productId={selectedProduct()} />
        //   ) : (
        //     <div class="p-4 sm:p-6">
        //       Please save the product first to manage inventory.
        //     </div>
        //   );
        // case "seo":
        //   return selectedProduct() ? (
        //     <div class="p-4 sm:p-6">
        //       SEO optimization for product {selectedProduct()} coming soon...
        //     </div>
        //   ) : (
        //     <div class="p-4 sm:p-6">
        //       Please save the product first to manage SEO.
        //     </div>
        //   );
        // case "media":
        //   return selectedProduct() ? (
        //     <ProductMedia productId={selectedProduct()} />
        //   ) : (
        //     <div class="p-4 sm:p-6">
        //       Please save the product first to manage media.
        //     </div>
        //   );
        default:
          return <ProductDetails />;
      }
    }

    // General topics when not editing a product
    switch (selectedTopic()) {
      case "productstablebel":
        return <ProductsTable />;
      // case "inventory":
      //   return <InventoryManagement />;
      // case "orders":
      //   return <ProductOrders />;
      // case "analytics":
      //   return <ProductAnalytics />;
      // case "collections":
      //   return <ProductCollections />;
      default:
        return <ProductsTable />;
    }
  };

  return <div class="h-full overflow-auto bg-white">{renderContent()}</div>;
};
