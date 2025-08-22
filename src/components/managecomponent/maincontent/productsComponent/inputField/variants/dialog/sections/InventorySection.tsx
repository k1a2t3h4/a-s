import {  Show } from "solid-js";
import { useProductContext } from "../../../../../../../contexts/ProductContext";

type Props = {
  index: number;
};

const InventorySection = (props: Props) => {
  const { productFormData, updateCombination } = useProductContext();
  const combination = productFormData().variantCombinations![props.index];

  return (
    <div class="mb-4">
      {/* Track Quantity */}
      <div class="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          id="track-quantity"
          checked={combination.trackQuantity || false}
          onInput={(e) =>
            updateCombination(props.index, "trackQuantity", (e.target as HTMLInputElement).checked)
          }
        />
        <label for="track-quantity">Track quantity</label>
      </div>

      <Show when={combination.trackQuantity}>
        <>
          <div class="mb-2">
            <label>Quantity</label>
            <input
              type="number"
              value={combination.availableQuantity || ""}
              onInput={(e) =>
                updateCombination(props.index, "availableQuantity", (e.target as HTMLInputElement).value)
              }
              placeholder="0"
              min="0"
              class="border rounded px-2 py-1 w-full"
            />
          </div>

          <div class="mb-2">
            <label>Shop location</label>
            <input
              type="number"
              value={combination.shopLocation || ""}
              onInput={(e) =>
                updateCombination(props.index, "shopLocation", (e.target as HTMLInputElement).value)
              }
              placeholder="0"
              min="0"
              class="border rounded px-2 py-1 w-full"
            />
          </div>
        </>
      </Show>

      {/* Continue selling out-of-stock */}
      <div class="flex items-start space-x-2 mb-2">
        <input
          type="checkbox"
          id="continue-selling"
          checked={combination.continueSellingOutOfStock || false}
          onInput={(e) =>
            updateCombination(props.index, "continueSellingOutOfStock", (e.target as HTMLInputElement).checked)
          }
        />
        <div>
          <label for="continue-selling">Continue selling when out of stock</label>
          <p class="text-sm text-gray-500 mt-1">
            This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below.
          </p>
        </div>
      </div>

      {/* SKU/Barcode */}
      <div class="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          id="has-sku-barcode"
          checked={combination.hasSKUBarcode || false}
          onInput={(e) =>
            updateCombination(props.index, "hasSKUBarcode", (e.target as HTMLInputElement).checked)
          }
        />
        <label for="has-sku-barcode">This product has a SKU or barcode</label>
      </div>

      <Show when={combination.hasSKUBarcode}>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>SKU (Stock Keeping Unit)</label>
            <input
              type="text"
              value={combination.sku || ""}
              onInput={(e) => updateCombination(props.index, "sku", (e.target as HTMLInputElement).value)}
              placeholder="Enter SKU"
              class="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label>Barcode (ISBN, UPC, GTIN, etc.)</label>
            <input
              type="text"
              value={combination.barcode || ""}
              onInput={(e) =>
                updateCombination(props.index, "barcode", (e.target as HTMLInputElement).value)
              }
              placeholder="Enter barcode"
              class="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>
      </Show>
    </div>
  );
};

export default InventorySection;
