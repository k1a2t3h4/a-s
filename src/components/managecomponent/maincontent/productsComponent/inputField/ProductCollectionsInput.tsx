import { createSignal, Show, For } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";
import {
  getAvailableCollectionsByProduct,
  addCollectionToGlobalListByProduct,
} from "../../../../lib/form-data";

export const ProductCollectionsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const [currentCollectionByProduct, setCurrentCollectionByProduct] =
    createSignal("");
  const [showCollectionsByProductDropdown, setShowCollectionsByProductDropdown] =
    createSignal(false);

  const availableCollections = getAvailableCollectionsByProduct();

  const filteredCollectionsByProduct = () =>
    [...new Set(availableCollections)].filter(
      (collection) =>
        collection
          .toLowerCase()
          .includes(currentCollectionByProduct().toLowerCase()) &&
        !(productFormData().collections || []).includes(collection)
    );

  const handleAddCollectionByProduct = (collection: string) => {
    if (
      collection.trim() &&
      !(productFormData().collections || []).includes(collection.trim())
    ) {
      setProductFormData((prev: any) => ({
        ...prev,
        collections: [...(prev.collections || []), collection.trim()],
      }));
    }
    addCollectionToGlobalListByProduct(
      collection.trim(),
      productFormData().ProductID ||''
    );
    setCurrentCollectionByProduct("");
    setShowCollectionsByProductDropdown(false);
  };

  const removeCollectionByProduct = (collectionToRemove: string) => {
    setProductFormData((prev: any) => ({
      ...prev,
      collections: (prev.collections || []).filter(
        (collection: string) => collection !== collectionToRemove
      ),
    }));
  };

  return (
    <div class="col-span-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Collections
      </label>
      <div class="relative">
        <div class="flex gap-2">
          <input
            type="text"
            value={currentCollectionByProduct()}
            onInput={(e) => setCurrentCollectionByProduct(e.currentTarget.value)}
            placeholder="Type to filter or add custom collection"
            class="flex-1 border rounded-md px-2 py-1 text-sm"
            onFocus={() => setShowCollectionsByProductDropdown(true)}
            onBlur={(e) => {
              setTimeout(() => {
                if (
                  !(e.relatedTarget as HTMLElement)?.closest(
                    ".collections-by-product-dropdown"
                  )
                ) {
                  setShowCollectionsByProductDropdown(false);
                }
              }, 100);
            }}
          />
        </div>

        <Show
          when={
            showCollectionsByProductDropdown() &&
            (filteredCollectionsByProduct().length > 0 ||
              currentCollectionByProduct().trim())
          }
        >
          <div class="collections-by-product-dropdown absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            <For each={filteredCollectionsByProduct()}>
              {(collection) => (
                <div
                  class="p-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onMouseDown={() => handleAddCollectionByProduct(collection)}
                >
                  {collection}
                </div>
              )}
            </For>

            <Show
              when={
                currentCollectionByProduct().trim() &&
                !availableCollections.includes(
                  currentCollectionByProduct().trim()
                ) &&
                !(productFormData().collections || []).includes(
                  currentCollectionByProduct().trim()
                )
              }
            >
              <div
                class="p-2 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-100 flex items-center gap-2"
                onMouseDown={() => {
                  handleAddCollectionByProduct(
                    currentCollectionByProduct().trim()
                  );
                  setShowCollectionsByProductDropdown(false);
                }}
              >
                <span class="text-green-600 font-bold">＋</span>
                {`Add custom collection "${currentCollectionByProduct().trim()}"`}
              </div>
            </Show>
          </div>
        </Show>
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        <For each={productFormData().collections || []}>
          {(collection: string) => (
            <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
              {collection}
              <button
                type="button"
                class="ml-1 text-gray-500 hover:text-red-600"
                onClick={() => removeCollectionByProduct(collection)}
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
