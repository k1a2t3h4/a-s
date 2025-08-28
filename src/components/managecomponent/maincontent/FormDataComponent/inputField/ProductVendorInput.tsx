import { useProductContext } from '../../../../contexts/FormDataContext';
import { VendorDetailsList } from '../../../../lib/product-data';
import { createMemo } from "solid-js";

export const ProductVendorInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  

  const vendorKeys = createMemo(() => Object.keys(VendorDetailsList));

  return (
    <div>
      <label class="block text-sm font-medium mb-1">Vendor *</label>
      <select
        class="border rounded-md px-2 py-1 w-full"
        value={productFormData().vendor || ""}
        onInput={(e) =>
          setProductFormData((prev: any) => ({
            ...prev,
            vendor: e.currentTarget.value
          }))
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
