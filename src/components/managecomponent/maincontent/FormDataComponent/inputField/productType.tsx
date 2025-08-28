import { createSignal, Show, For } from "solid-js";
import { useProductContext,getAvailableProductTypes ,addProductTypeToGlobalList} from "../../../../contexts/FormDataContext";


export const ProductTypeInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const [currentKeyword, setCurrentKeyword] = createSignal("");
  const [showDropdown, setShowDropdown] = createSignal(false);

  const availableKeywords = getAvailableProductTypes();

  const filteredKeywords = () =>
    [...new Set(availableKeywords)].filter((k) =>
      k.toLowerCase().includes(currentKeyword().toLowerCase())
    );

  // ✅ Select or add product type
  const handleSetKeyword = (keyword: string) => {
    if (!keyword.trim()) return;
    setProductFormData((prev: any) => ({
      ...prev,
      productType: keyword.trim(),
    }));
    addProductTypeToGlobalList(keyword.trim());
    setCurrentKeyword("");
    setShowDropdown(false);
  };

  // ✅ Clear selected product type
  const clearKeyword = () => {
    setProductFormData((prev: any) => ({
      ...prev,
      productType: "",
    }));
  };

  return (
    <div class="col-span-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
      <div class="relative">
        <div class="relative w-full">
            <input
                type="text"
                value={currentKeyword() || productFormData().productType || ""}
                onInput={(e) => setCurrentKeyword(e.currentTarget.value)}
                placeholder="Type to search or add custom"
                class="flex-1 border rounded-md px-2 py-1 text-sm w-full pr-7" // add right padding for button
                onFocus={() => setShowDropdown(true)}
                onBlur={(e) => {
                setTimeout(() => {
                    if (!(e.relatedTarget as HTMLElement)?.closest(".keyword-dropdown")) {
                    setShowDropdown(false);
                    }
                }, 100);
                }}
            />

            <Show when={productFormData().productType}>
                <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 text-sm"
                onClick={clearKeyword}
                >
                ✕
                </button>
            </Show>
        </div>

        <Show when={showDropdown() && (filteredKeywords().length > 0 || currentKeyword().trim())}>
          <div class="keyword-dropdown absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            <For each={filteredKeywords()}>
              {(keyword) => (
                <div
                  class="p-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onMouseDown={() => handleSetKeyword(keyword)}
                >
                  {keyword}
                </div>
              )}
            </For>

            <Show
              when={
                currentKeyword().trim() &&
                !availableKeywords.includes(currentKeyword().trim())
              }
            >
              <div
                class="p-2 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-100 flex items-center gap-2"
                onMouseDown={() => handleSetKeyword(currentKeyword().trim())}
              >
                <span class="text-green-600 font-bold">＋</span>
                {`Add custom "${currentKeyword().trim()}"`}
              </div>
            </Show>
          </div>
        </Show>
      </div>

    </div>
  );
};
