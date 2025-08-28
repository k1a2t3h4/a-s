import { useProductContext } from "../../../../../../../contexts/FormDataContext";

type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};

const SkuSection = (props: Props) => {
  const { productFormData, updateCombination } = useProductContext();

  const combination = () => productFormData().variantCombinations![props.index];

  return (
    <div>
      <div class="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          id={`has-sku-barcode-${props.index}`}
          checked={combination().hasSKUBarcode || false}
          onInput={(e) =>
            updateCombination(
              props.index,
              "hasSKUBarcode",
              (e.target as HTMLInputElement).checked
            )
          }
        />
        <label for={`has-sku-barcode-${props.index}`}>
          This product has a SKU or barcode
        </label>
      </div>

      {combination().hasSKUBarcode && (
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>SKU (Stock Keeping Unit)</label>
            <input
              type="text"
              class="w-full border rounded px-2 py-1"
              value={combination().sku || ""}
              onInput={(e) =>
                updateCombination(
                  props.index,
                  "sku",
                  (e.target as HTMLInputElement).value
                )
              }
              placeholder="Enter SKU"
            />
            {/* {!!combination().skuError && (
              <p class="text-red-500 text-xs mt-1">
                {combination().skuError}
              </p>
            )} */}
          </div>

          <div>
            <label>Barcode (ISBN, UPC, GTIN, etc.)</label>
            <input
              type="text"
              class="w-full border rounded px-2 py-1"
              value={combination().barcode || ""}
              onInput={(e) =>
                updateCombination(
                  props.index,
                  "barcode",
                  (e.target as HTMLInputElement).value
                )
              }
              placeholder="Enter barcode"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkuSection;
