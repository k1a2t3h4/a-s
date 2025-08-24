import { useProductContext } from '../../../../../../../contexts/ProductContext';
import { createMemo } from "solid-js";

type Props = {
  index: number;
};

export const ProductVariantVendorInput = (props:Props) => {
  const { productFormData, updateCombination ,VendorDetailsList} = useProductContext();
  const combination = productFormData().variantCombinations![props.index];
  const vendorKeys = createMemo(() => Object.keys(VendorDetailsList));

  return (
    <div>
      <label class="block text-sm font-medium mb-1">Vendor *</label>
      <select
        class="border rounded-md px-2 py-1 w-full"
        value={combination.vendor || ""}
        onInput={(e) =>
          updateCombination(props.index, "vendor", (e.target as HTMLSelectElement).value)
        }
      >
        <option value="" disabled>
          Select a vendor
        </option>
        {vendorKeys().map((vendor) => (
          <option value={vendor}>{vendor}</option>
        ))}
      </select>
    </div>
  );
};
