import { For, createSignal } from "solid-js";
import { useProductContext } from "../../../../../../contexts/ProductContext";

const VariantOptions = () => {
  const {
    productFormData,
    handleDragOver,
    handleDragStart,
    handleDrop,
    updateVariantName,
    removeVariantOption,
    removeVariantValue,
    updateVariantValue,
    getVariantNameError,
    getVariantOptionValueError,
    variantNameNoValueErrorIds,
    showVariantValueErrors,
    addVariantValue,
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
            </div>

            {/* Option Errors */}
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

            {/* Values Section */}
            <div class="space-y-2">
              {/* Add New Value */}
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add value"
                  class="flex-1 border rounded px-2 py-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      addVariantValue(variant.id, e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                  disabled={variant.name.length === 0}
                />
                <button
                  type="button"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      addVariantValue(variant.id, input.value.trim());
                      input.value = "";
                    }
                  }}
                  disabled={variant.name.length === 0}
                >
                  Add
                </button>
              </div>

              {/* Render Values */}
              <div class="flex flex-wrap gap-2">
                <For each={variant.values}>
                  {(value, vIndex) => {
                    const [isEditing, setIsEditing] = createSignal(false);
                    const [editValue, setEditValue] = createSignal(value);

                    return (
                      <span class="px-2 py-1 text-sm bg-gray-100 border rounded flex items-center gap-1">
                        {isEditing() ? (
                          <input
                            type="text"
                            class="border px-1 py-0.5 rounded text-sm w-16"
                            value={editValue()}
                            onInput={(e) => setEditValue(e.currentTarget.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateVariantValue(
                                  variant.id,
                                  value,
                                  editValue().trim()
                                );
                                setIsEditing(false);
                              } else if (e.key === "Escape") {
                                setIsEditing(false);
                                setEditValue(value);
                              }
                            }}
                          />
                        ) : (
                          <>
                            <span
                              onClick={() => setIsEditing(true)}
                              class="cursor-pointer"
                            >
                              {value}
                            </span>
                            <span
                              class="cursor-pointer text-gray-500 hover:text-red-600"
                              onClick={() =>
                                removeVariantValue(variant.id, vIndex())
                              }
                            >
                              ✕
                            </span>
                          </>
                        )}
                      </span>
                    );
                  }}
                </For>
              </div>
            </div>

            {/* Error for Values */}
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
