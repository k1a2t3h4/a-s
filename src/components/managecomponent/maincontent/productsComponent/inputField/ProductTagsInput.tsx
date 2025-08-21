import { createSignal, Show, For } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";
import { getAvailableTagsByProduct, addTagToGlobalListByProduct } from "../../../../lib/form-data";

export const ProductTagsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const [currentTagByProduct, setCurrentTagByProduct] = createSignal("");
  const [showTagsByProductDropdown, setShowTagsByProductDropdown] = createSignal(false);

  const availableTags = getAvailableTagsByProduct();

  const filteredTagsByProduct = () =>
    [...new Set(availableTags)].filter(
      (tag) =>
        tag.toLowerCase().includes(currentTagByProduct().toLowerCase()) &&
        !(productFormData().tags || []).includes(tag)
    );

  const handleAddTagByProduct = (tag: string) => {
    if (tag.trim() && !(productFormData().tags || []).includes(tag.trim())) {
      setProductFormData((prev: any) => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()],
      }));
    }
    addTagToGlobalListByProduct(tag.trim(), productFormData().ProductID || '');
    setCurrentTagByProduct("");
    setShowTagsByProductDropdown(false);
  };

  const removeTagByProduct = (tagToRemove: string) => {
    setProductFormData((prev: any) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag: string) => tag !== tagToRemove),
    }));
  };

  return (
    <div class="col-span-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
      <div class="relative">
        <div class="flex gap-2">
          <input
            type="text"
            value={currentTagByProduct()}
            onInput={(e) => setCurrentTagByProduct(e.currentTarget.value)}
            placeholder="Type to filter or add custom tag"
            class="flex-1 border rounded-md px-2 py-1 text-sm"
            onFocus={() => setShowTagsByProductDropdown(true)}
            onBlur={(e) => {
              setTimeout(() => {
                if (!(e.relatedTarget as HTMLElement)?.closest(".tags-by-product-dropdown")) {
                  setShowTagsByProductDropdown(false);
                }
              }, 100);
            }}
          />
        </div>

        <Show when={showTagsByProductDropdown() && (filteredTagsByProduct().length > 0 || currentTagByProduct().trim())}>
          <div class="tags-by-product-dropdown absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            <For each={filteredTagsByProduct()}>
              {(tag) => (
                <div
                  class="p-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onMouseDown={() => handleAddTagByProduct(tag)}
                >
                  {tag}
                </div>
              )}
            </For>

            <Show
              when={
                currentTagByProduct().trim() &&
                !availableTags.includes(currentTagByProduct().trim()) &&
                !(productFormData().tags || []).includes(currentTagByProduct().trim())
              }
            >
              <div
                class="p-2 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-100 flex items-center gap-2"
                onMouseDown={() => {
                  handleAddTagByProduct(currentTagByProduct().trim());
                  setShowTagsByProductDropdown(false);
                }}
              >
                <span class="text-green-600 font-bold">＋</span>
                {`Add custom tag "${currentTagByProduct().trim()}"`}
              </div>
            </Show>
          </div>
        </Show>
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        <For each={productFormData().tags || []}>
          {(tag: string) => (
            <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
              {tag}
              <button
                type="button"
                class="ml-1 text-gray-500 hover:text-red-600"
                onClick={() => removeTagByProduct(tag)}
              >
                ✕
              </button>
            </span>
          )}
        </For>
      </div>
    </div>
  );
};
