import { createMemo } from "solid-js";
import { useProductContext } from "../../../../../../../contexts/FormDataContext";

type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};

const PricingSection = (props: Props) => {
  const { productFormData, updateCombination } = useProductContext();
  const combination = productFormData().variantCombinations![props.index];

  // Derived values
  const profit = createMemo(() => {
    const p = parseFloat(combination.price || "0");
    const c = parseFloat(combination.compareAtPrice || "0");
    return p > 0 && c > 0 ? (p - c).toFixed(2) : "--";
  });

  const margin = createMemo(() => {
    const p = parseFloat(combination.price || "0");
    const c = parseFloat(combination.compareAtPrice || "0");
    if (p > 0 && c > 0) {
      const pf = p - c;
      return ((pf / p) * 100).toFixed(1) + "%";
    }
    return "--";
  });

  return (
    <div>
      {/* Price & Compare-at price */}
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label class="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={combination.price || ""}
            onInput={(e) =>
              updateCombination(props.index, "price", (e.target as HTMLInputElement).value)
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            class="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Compare-at price</label>
          <input
            type="number"
            value={combination.compareAtPrice || ""}
            onInput={(e) =>
              updateCombination(props.index, "compareAtPrice", (e.target as HTMLInputElement).value)
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            class="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      {/* Cost, Profit & Margin */}
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Cost per item</label>
          <input
            type="number"
            value={combination.compareAtPrice || ""}
            onInput={(e) =>
              updateCombination(props.index, "costPerItem", (e.target as HTMLInputElement).value)
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            class="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Profit</label>
          <input
            value={profit()}
            disabled
            class="border rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Margin</label>
          <input
            value={margin()}
            disabled
            class="border rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
