import { For } from "solid-js";
import { useProductVariantContext } from "../../../../../../contexts/ProductVariantProvider";
import VariantCombinationDialog from '../dialog/VariantCombinationDialog';
const VariantCombinationsTable = () => {
  const {
    variantCombinations,
    setEditingComboIndex,
    setImageUrlPopupIndex,
    setNewImageUrl,
    setImageUrlError,
    updateCombination,
    editingComboIndex,
    
  } = useProductVariantContext();

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
        <For each={variantCombinations}>
          {(combination, index) => {
            let imageUrl = combination.image;
            if (!imageUrl && Array.isArray(combination.varientmedia)) {
              const firstImg = combination.varientmedia.find((m:any) => m.type === "image");
              if (firstImg) imageUrl = firstImg.url;
            }

            return (
              <tr
                class="cursor-pointer border-b hover:bg-gray-50"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== "INPUT") {
                    setEditingComboIndex(index());
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
                    {([key, value]) => (
                      <span class="px-2 py-1 text-sm border rounded bg-gray-100">
                        {key}: {value}
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
                {editingComboIndex === index() && (
                  <VariantCombinationDialog
                  open={editingComboIndex !== null}
                  index={index()}
                  />
                )}
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

export default VariantCombinationsTable;
