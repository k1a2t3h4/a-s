import { For } from "solid-js";
import { useProductContext } from "../../../../../../contexts/ProductContext";

const VariantOptions = () => {
  const {
    productFormData,
    handleDragOver,
    handleDragStart,
    handleDrop,
    updateVariantName,
    removeVariantOption,
    addVariantValue,
    removeVariantValue,
    getVariantNameError,
    getVariantOptionValueError,
    variantNameNoValueErrorIds,
    showVariantValueErrors,
  } = useProductContext();

  return (
    <div class="space-y-4">
      <For each={productFormData().variantOptions}>
        {(variant, index) => (
          <div
            class="border rounded-lg p-4 bg-white"
            draggable
            onDragStart={() => handleDragStart(index())}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index())}
          >
            {/* Header */}
            <div class="flex items-center justify-between mb-3">
            <div class="space-y-2">
            <div class="flex gap-2">
              <span class="cursor-move text-gray-400 select-none">⋮⋮</span>
              <input
                value={variant.name}
                type="text"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    updateVariantName(variant.id, e.currentTarget.value.trim());
                    e.currentTarget.blur(); // optional: remove focus
                  }
                }}
                class={`w-48 border rounded px-2 py-1 ${
                  getVariantNameError(variant.id, variant.name) ||
                  variantNameNoValueErrorIds.includes(variant.id)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    updateVariantName(variant.id, input.value.trim());
                  }
                }}
              >
                update
              </button>
            </div>
          </div>

              {/* Validation errors */}
              {getVariantNameError(variant.id, variant.name) && (
                <p class="text-red-500 text-xs mt-1">
                  {getVariantNameError(variant.id, variant.name)}
                </p>
              )}
              {variantNameNoValueErrorIds.includes(variant.id) &&
                variant.name.trim().length === 0 && (
                  <p class="text-red-500 text-xs mt-1">
                    Please enter a name for this option before adding values.
                  </p>
                )}
              {variantNameNoValueErrorIds.includes(variant.id) &&
                variant.name.trim().length > 0 && (
                  <p class="text-red-500 text-xs mt-1">
                    {getVariantOptionValueError(variant)}
                  </p>
                )}

              {/* Remove Option Button */}
              <button
                type="button"
                class="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                onClick={() => removeVariantOption(variant.id)}
              >
                ✕
              </button>
            </div>

            {/* Values Section */}
            <div class="space-y-2">
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add value"
                  class="flex-1 border rounded px-2 py-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addVariantValue(variant.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      addVariantValue(variant.id, input.value);
                      input.value = "";
                    }
                  }}
                >
                  Add
                </button>
              </div>

              {/* Render values as badges */}
              <div class="flex flex-wrap gap-2">
                <For each={variant.values}>
                  {(value, vIndex) => (
                    <span class="px-2 py-1 text-sm bg-gray-100 border rounded flex items-center gap-1">
                      {value}
                      <span
                        class="cursor-pointer text-gray-500 hover:text-red-600"
                        onClick={() => removeVariantValue(variant.id, vIndex())}
                      >
                        ✕
                      </span>
                    </span>
                  )}
                </For>
              </div>
            </div>

            {/* Error for values */}
            {getVariantOptionValueError(variant) && showVariantValueErrors && (
              <p class="text-red-500 text-xs mt-1">
                {getVariantOptionValueError(variant)}
              </p>
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export default VariantOptions;
