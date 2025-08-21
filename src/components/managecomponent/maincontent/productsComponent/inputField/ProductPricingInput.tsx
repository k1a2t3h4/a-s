import { createSignal, createEffect } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";
import type { ProductFormData } from "../../../../contexts/ProductContext";

export const ProductPricingInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const [profit, setProfit] = createSignal("--");
  const [margin, setMargin] = createSignal("--");

  // Recalculate profit & margin whenever price or cost changes
  createEffect(() => {
    const price = parseFloat(productFormData()?.price || "0");
    const cost = parseFloat(productFormData()?.costPerItem || "0");
    if (price > 0 && cost > 0) {
      const calculatedProfit = price - cost;
      const calculatedMargin = (calculatedProfit / price) * 100;
      setProfit(calculatedProfit.toFixed(2));
      setMargin(calculatedMargin.toFixed(1) + "%");
    } else {
      setProfit("--");
      setMargin("--");
    }
  });

  const handleChange = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => {
    setProductFormData((prev)=> ({ ...prev, [field]: value }));
  };

  return (
    <div class="border rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div class="border-b p-4">
        <h3 class="text-lg font-semibold">Pricing</h3>
      </div>

      {/* Content */}
      <div class="p-4 space-y-4">
        {/* Price + Compare-at price */}
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                value={productFormData()?.price || ""}
                onInput={(e) =>
                  handleChange("price", (e.target as HTMLInputElement).value)
                }
                placeholder="0.00"
                class="pl-8 w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Compare-at price
            </label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                value={productFormData()?.compareAtPrice || ""}
                onInput={(e) =>
                  handleChange("compareAtPrice", (e.target as HTMLInputElement).value)
                }
                placeholder="0.00"
                class="pl-8 w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Charge tax */}
        <div class="flex items-center space-x-2">
          <input
            id="charge-tax"
            type="checkbox"
            checked={productFormData()?.chargeTax || false}
            onInput={(e) =>
              handleChange("chargeTax", (e.target as HTMLInputElement).checked)
            }
            class="h-4 w-4 border-gray-300 rounded"
          />
          <label for="charge-tax" class="text-sm text-gray-700">
            Charge tax on this product
          </label>
        </div>

        {/* Cost / Profit / Margin */}
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Cost per item
            </label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                value={productFormData()?.costPerItem || ""}
                onInput={(e) =>
                  handleChange("costPerItem", (e.target as HTMLInputElement).value)
                }
                placeholder="0.00"
                class="pl-8 w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-500"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Profit
            </label>
            <input
              value={profit()}
              disabled
              class="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Margin
            </label>
            <input
              value={margin()}
              disabled
              class="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
