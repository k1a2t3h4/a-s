import { Show } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";

export const ProductInventoryInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const handleChange = (field: string, value: string | boolean) => {
    setProductFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div class="border rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div class="border-b p-4">
        <h3 class="text-lg font-semibold">Inventory</h3>
      </div>

      {/* Content */}
      <div class="p-4 space-y-4">
        {/* Track quantity */}
        <div class="flex items-center space-x-2">
          <input
            id="track-quantity"
            type="checkbox"
            checked={productFormData()?.trackQuantity || false}
            onInput={(e) =>
              handleChange("trackQuantity", (e.target as HTMLInputElement).checked)
            }
            class="h-4 w-4 border-gray-300 rounded"
          />
          <label for="track-quantity" class="text-sm text-gray-700">
            Track quantity
          </label>
        </div>

        {/* Quantity + Shop Location (only if tracking is enabled) */}
        <Show when={productFormData()?.trackQuantity}>
          <div>
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={productFormData()?.availableQuantity || ""}
              onInput={(e) =>
                handleChange("availableQuantity", (e.target as HTMLInputElement).value)
              }
              placeholder="0"
              min="0"
              class="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Shop location</label>
            <input
              type="number"
              value={productFormData()?.shopLocation || "0"}
              onInput={(e) =>
                handleChange("shopLocation", (e.target as HTMLInputElement).value)
              }
              placeholder="0"
              min="0"
              class="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
            />
          </div>
        </Show>

        {/* Continue selling out of stock */}
        <div class="flex items-start space-x-2">
          <input
            id="continue-selling"
            type="checkbox"
            checked={productFormData()?.continueSellingOutOfStock || false}
            onInput={(e) =>
              handleChange(
                "continueSellingOutOfStock",
                (e.target as HTMLInputElement).checked
              )
            }
            class="h-4 w-4 border-gray-300 rounded"
          />
          <div>
            <label for="continue-selling" class="text-sm text-gray-700">
              Continue selling when out of stock
            </label>
            <p class="text-sm text-gray-500 mt-1">
              This won't affect Shopify POS. Staff will see a warning, but can
              complete sales when available inventory reaches zero and below.
            </p>
          </div>
        </div>

        {/* SKU / Barcode */}
        <div class="flex items-center space-x-2">
          <input
            id="has-sku-barcode"
            type="checkbox"
            checked={productFormData()?.hasSKUBarcode || false}
            onInput={(e) =>
              handleChange("hasSKUBarcode", (e.target as HTMLInputElement).checked)
            }
            class="h-4 w-4 border-gray-300 rounded"
          />
          <label for="has-sku-barcode" class="text-sm text-gray-700">
            This product has a SKU or barcode
          </label>
        </div>

        <Show when={productFormData()?.hasSKUBarcode}>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                SKU (Stock Keeping Unit)
              </label>
              <input
                value={productFormData()?.sku || ""}
                onInput={(e) =>
                  handleChange("sku", (e.target as HTMLInputElement).value)
                }
                placeholder="Enter SKU"
                class="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Barcode (ISBN, UPC, GTIN, etc.)
              </label>
              <input
                value={productFormData()?.barcode || ""}
                onInput={(e) =>
                  handleChange("barcode", (e.target as HTMLInputElement).value)
                }
                placeholder="Enter barcode"
                class="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};
