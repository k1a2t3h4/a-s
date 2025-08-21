// src/components/products/ProductDetails.tsx
import { type Component} from "solid-js";
import { useProductContext } from "../../../contexts/ProductContext";
import { ProductIDInput } from "./inputField/ProductIDInput";
import { ProductNameInput } from "./inputField/ProductNameInput";
import { ProductDescriptionInput } from "./inputField/ProductDescriptionInput";
import { ProductPricingInput } from "./inputField/ProductPricingInput";
import { ProductInventoryInput } from "./inputField/ProductInventoryInput";
import { ProductTemplateInput } from "./inputField/ProductTemplateInput";
import { ProductStatusInput } from "./inputField/ProductStatusInput";
import { ProductVendorInput } from "./inputField/ProductVendorInput";
import { ProductAvailableLocationsInput } from "./inputField/ProductAvailableLocationsInput";
import { ProductDeepCategoryInput } from "./inputField/ProductDeepCategoryInput";
import { ProductGlobalMediaInput } from "./inputField/ProductGlobalMediaInput";
import { ProductTagsInput } from "./inputField/ProductTagsInput";
import { ProductCollectionsInput } from "./inputField/ProductCollectionsInput";
import { PhysicalProductFields } from "./inputField/PhysicalProductFields";
import { ProductVariantsInput } from "./inputField/ProductVariantsInput";
// import  {
//   ProductIDInput,
//   ProductNameInput,
//   ProductDescriptionInput,
//   ProductTemplateInput,
//   ProductStatusInput,
//   ProductVendorInput,
//   ProductAvailableLocationsInput,
//   ProductDeepCategoryInput,
//   ProductGlobalMediaInput,
//   ProductTagsInput,
//   ProductCollectionsInput,
//   ProductVariantsInput,
//   PhysicalProductFields,
//   ProductPricingInput,
//   ProductInventoryInput,
// } from "./inputField";


export const ProductDetails: Component = () => {
  const {
    productFormData,
    canSave,
    handleSave,
    handleDiscard,
    selectedProduct,
    selectedTopic,
  } = useProductContext();

  // Only show if adding/editing a product
  if (
    selectedProduct() === null &&
    !canSave() &&
    !productFormData().ProductName &&
    selectedTopic() !== "productdetails"
  )
    return null;

  return (
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            {selectedProduct() ? "Edit Product" : "Add New Product"}
          </h2>

          <div class="space-y-4 sm:space-y-6">
            <ProductIDInput />
            <ProductNameInput />
            <ProductDescriptionInput />
            <ProductPricingInput />
            <ProductInventoryInput />
            <ProductTemplateInput />
            <ProductStatusInput />
            <ProductVendorInput />
            <ProductAvailableLocationsInput />
            <ProductDeepCategoryInput />
            <ProductGlobalMediaInput />
            <ProductTagsInput />
            <ProductCollectionsInput />
            <PhysicalProductFields />
            <ProductVariantsInput />

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={!canSave()}
                class="flex-1 sm:flex-none bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                disabled={!canSave()}
                class="flex-1 sm:flex-none border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
