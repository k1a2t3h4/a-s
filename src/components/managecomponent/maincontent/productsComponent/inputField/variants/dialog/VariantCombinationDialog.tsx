import { Show } from "solid-js";
// import PricingSection from "./sections/PricingSection";
import InventorySection from "./sections/InventorySection";
// import SkuSection from "./sections/SkuSection";
// import MediaSection from "./sections/MediaSection";
// import PhysicalSection from "./sections/PhysicalSection";
// import HsSection from "./sections/HsSection";
import { useProductVariantContext } from "../../../../../../contexts/ProductVariantProvider";
interface VariantCombinationDialogProps {
  open: boolean;
  index:number;
}

const VariantCombinationDialog = (props: VariantCombinationDialogProps) => {
    const {
      variantCombinations,
      setEditingComboIndex 
    } = useProductVariantContext();
  return (
    <Show when={props.open}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div class="mb-4 border-b pb-2">
            <h2 class="text-lg font-semibold">
              Edit {Object.values(variantCombinations[props.index]).join("/")}
            </h2>
          </div>

          {/* Sections */}
          <div class="mb-4">
            <InventorySection
              index={props.index}
            />
          </div>

          {/* <div class="mb-4">
            <PricingSection
             index={props.index}
            />
          </div>

          <div class="mb-4">
            <SkuSection
              index={props.index}
            />
          </div>

          <div class="mb-4">
            <MediaSection
              index={props.index}
            />
          </div>

          <div class="mb-4">
            <PhysicalSection
              index={props.index}
            />
          </div>

          <div class="mb-4">
            <HsSection
             index={props.index}
            />
          </div> */}

          {/* Footer */}
          <div class="flex justify-end gap-2 mt-4 border-t pt-2">
            <button
              type="button"
              class="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={()=>setEditingComboIndex(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={()=>setEditingComboIndex(null)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default VariantCombinationDialog;
