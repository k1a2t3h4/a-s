import { For, Show, createSignal } from "solid-js";
import { useProductContext } from "../../../../../../contexts/ProductContext";

import InventorySection from "../dialog/sections/InventorySection";
import PricingSection from "../dialog/sections/PricingSection";
import SkuSection from "../dialog/sections/SkuSection";
import MediaSection from "../dialog/sections/MediaSection";
import PhysicalSection from "../dialog/sections/PhysicalSection";
import HsSection from "../dialog/sections/HsSection";
import { ProductVariantDescriptionInput } from "../dialog/sections/ProductDescriptionInput";
import { ProductVarientNameInput } from "../dialog/sections/ProductNameInput";
import { ProductVarientIDInput } from "../dialog/sections/ProductIDInput";
import { ProductVariantVendorInput } from "../dialog/sections/ProductVendorInput";
import { ProductVariantStatusInput } from "../dialog/sections/ProductStatusInput";
import { VariantProductAvailableLocationsInput } from "../dialog/sections/ProductAvailableLocationsInput";
const VariantCombinationsTable = () => {
  const {
    productFormData,
    setImageUrlPopupIndex,
    setNewImageUrl, 
    setImageUrlError,
    updateCombination,
    expandedIndices,
    setExpandedIndices
  } = useProductContext();

  return (
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="border-b bg-gray-100">
          <th class="px-2 py-1 text-left">Image</th>
          <th class="px-2 py-1 text-left">Combination</th>
          <th class="px-2 py-1 text-left">Price</th>
          <th class="px-2 py-1 text-left">Available Quantity</th>
        </tr>
      </thead>
      <tbody>
        <For each={productFormData().variantCombinations}>
          {(combination, index) => {
            let imageUrl = combination.image;
            if (!imageUrl && Array.isArray(combination.variantmedia)) {
              const firstImg = combination.variantmedia.find((m: any) => m.type === "image");
              if (firstImg) imageUrl = firstImg.url;
            }

            return (
              <>
                {/* Main Row */}
                <tr
                  class="cursor-pointer border-b hover:bg-gray-50"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== "INPUT") {
                      setExpandedIndices((prev) =>
                        prev.includes(index())
                          ? prev.filter((i) => i !== index())
                          : [...prev, index()]
                      );
                    }
                  }}
                >
                  {/* Image cell */}
                  <td class="px-2 py-1">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="variant"
                        class="w-10 h-10 object-cover rounded border"
                      />
                    ) : (
                      <span
                        class="w-10 h-10 flex items-center justify-center border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageUrlPopupIndex(index());
                          setNewImageUrl("");
                          setImageUrlError("");
                        }}
                        title="Add Image"
                      >
                        ＋
                      </span>
                    )}
                  </td>

                  {/* Combination cell */}
                  <td class="px-2 py-1">
                    <div class="flex flex-wrap gap-1">
                      <For each={Object.entries(combination.combination) as [string, string][]}>
                        {([key,value]) => (
                          <span class="px-2 py-1 text-sm border rounded bg-gray-100">
                            {value}/
                          </span>
                        )}
                      </For>
                    </div>
                  </td>

                  {/* Price cell (editable) */}
                  <td class="px-2 py-1">
                    <input
                      type="number"
                      value={combination.price || ""}
                      onInput={(e) => updateCombination(index(), "price", e.currentTarget.value)}
                      class="w-24 border rounded px-2 py-1"
                      min="0"
                      step="0.01"
                      placeholder="Required"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>

                  {/* Available Quantity cell (editable) */}
                  <td class="px-2 py-1">
                    <input
                      type="number"
                      value={combination.availableQuantity || ""}
                      onInput={(e) =>
                        updateCombination(index(), "availableQuantity", e.currentTarget.value)
                      }
                      class="w-24 border rounded px-2 py-1"
                      min="0"
                      placeholder={combination.trackQuantity ? "Required" : "Optional"}
                      disabled={!combination.trackQuantity}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                </tr>

                {/* Dropdown Expanded Row */}
                <Show when={expandedIndices().includes(index())}>
                  <tr class="bg-gray-50">
                    <td colspan="100%" class="p-4">
                      <div class="space-y-4">
                        <ProductVarientIDInput index={index()}/>
                        <ProductVarientNameInput index={index()}/>
                        <ProductVariantDescriptionInput index={index()}/>
                        <ProductVariantStatusInput index={index()}/>
                        <VariantProductAvailableLocationsInput index={index()}/>
                        <ProductVariantVendorInput index={index()}/>
                        <InventorySection index={index()} />
                        <PricingSection index={index()} />
                        <SkuSection index={index()} />
                        <MediaSection index={index()} />
                        <PhysicalSection index={index()} />
                        <HsSection index={index()} />
                      </div>
                    </td>
                  </tr>
                </Show>
              </>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

export default VariantCombinationsTable;
