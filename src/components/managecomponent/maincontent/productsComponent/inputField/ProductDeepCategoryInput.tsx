import { createSignal } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";
import {
  categoryStructure,
  getCategoryPath,
  hasChildren,
  addCategoryToStructure,
  parseCategoryStructure
} from "../../../../lib/form-data";

export const ProductDeepCategoryInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [showCustomDeepCategory, setShowCustomDeepCategory] = createSignal(false);
  const [customDeepCategory, setCustomDeepCategory] = createSignal("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = createSignal(false);
  const [currentCategoryPath, setCurrentCategoryPath] = createSignal<string[]>([]);
  const [selectedCategoryPath, setSelectedCategoryPath] = createSignal("");

  // Get current level categories
  const getCurrentLevelCategories = () => {
    let currentLevel:any = categoryStructure;
    for (const pathKey of currentCategoryPath()) {
      if (currentLevel[pathKey] && currentLevel[pathKey].children) {
        currentLevel = currentLevel[pathKey].children;
      }
    }
    return currentLevel;
  };

  // Handle category selection
  const handleCategorySelect = (categoryKey: string, categoryName: string) => {
    const newPath = [...currentCategoryPath(), categoryKey];
    const newPathString = getCategoryPath(categoryStructure, newPath);
    let currentLevel:any = categoryStructure;
    for (const pathKey of currentCategoryPath()) {
      if (currentLevel[pathKey] && currentLevel[pathKey].children) {
        currentLevel = currentLevel[pathKey].children;
      }
    }
    const selectedCategory = currentLevel[categoryKey];
    if (hasChildren(selectedCategory)) {
      setCurrentCategoryPath(newPath);
      setSelectedCategoryPath(newPathString);
    } else {
      setSelectedCategoryPath(newPathString);
      setCategoryDropdownOpen(false);
      setCurrentCategoryPath([]);
      setProductFormData((prev: any) => ({ ...prev, deepCategory: newPathString }));
    }
  };

  // Navigate back
  const goBackInCategory = () => {
    if (currentCategoryPath().length > 0) {
      const newPath = currentCategoryPath().slice(0, -1);
      setCurrentCategoryPath(newPath);
      setSelectedCategoryPath(
        newPath.length > 0 ? getCategoryPath(categoryStructure, newPath) : ""
      );
    }
  };

  // Extract paths from parsed structure
  const extractCategoryPaths = (categories: any[], currentPath: string = ""): string[] => {
    const paths: string[] = [];
    for (const category of categories) {
      const newPath = currentPath ? `${currentPath} > ${category.name}` : category.name;
      if (category.children && category.children.length > 0) {
        paths.push(...extractCategoryPaths(category.children, newPath));
      } else {
        paths.push(newPath);
      }
    }
    return paths;
  };

  // Handle adding custom category
  const handleAddCustomCategory = () => {
    if (customDeepCategory().trim()) {
      if (/[>(),]/.test(customDeepCategory().trim())) {
        addCategoryToStructure &&
          addCategoryToStructure(customDeepCategory().trim(), currentCategoryPath());
        try {
          const parsed = parseCategoryStructure(customDeepCategory().trim());
          const availablePaths = extractCategoryPaths(parsed);
          if (availablePaths.length > 0) {
            const fullPath = selectedCategoryPath()
              ? `${selectedCategoryPath()} > ${availablePaths[0]}`
              : availablePaths[0];
            setProductFormData((prev: any) => ({ ...prev, deepCategory: fullPath }));
          }
        } catch (error) {
          console.error("Error parsing complex category structure:", error);
        }
      } else {
        const fullPath = selectedCategoryPath()
          ? `${selectedCategoryPath()} > ${customDeepCategory().trim()}`
          : customDeepCategory().trim();
        setProductFormData((prev: any) => ({ ...prev, deepCategory: fullPath }));
        addCategoryToStructure &&
          addCategoryToStructure(customDeepCategory().trim(), currentCategoryPath());
      }
      setShowCustomDeepCategory(false);
      setCustomDeepCategory("");
      setCategoryDropdownOpen(false);
    }
  };

  return (
    <div>
      <label class="block text-sm font-medium">Deep Category</label>

      {!showCustomDeepCategory() ? (
        <div class="space-y-2">
          {/* Dropdown toggle button */}
          <button
            type="button"
            class="w-full border rounded-md px-3 py-2 flex justify-between items-center text-left"
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen())}
          >
            {productFormData().deepCategory || "Select category..."}
            <span class="ml-2 opacity-50">▶</span>
          </button>

          {categoryDropdownOpen() && (
            <div class="border rounded-md mt-1 p-2 max-h-60 overflow-y-auto bg-white">
              {/* Back button */}
              {currentCategoryPath().length > 0 && (
                <button
                  class="flex items-center gap-2 text-blue-600 w-full text-left px-2 py-1"
                  onClick={goBackInCategory}
                >
                  ◀ Back to {currentCategoryPath().length > 1 ? "previous level" : "main categories"}
                </button>
              )}

              {/* Category list */}
              {Object.entries(getCurrentLevelCategories()).map(([key, category]: [string, any]) => (
                <button
                  class="flex justify-between items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={() => handleCategorySelect(key, category.name)}
                >
                  <span>{category.name}</span>
                  {hasChildren(category) && <span class="opacity-50">▶</span>}
                </button>
              ))}

              {/* Add custom category */}
              <button
                class="flex items-center gap-2 text-green-600 border-t w-full px-2 py-1 mt-2"
                onClick={() => {
                  setShowCustomDeepCategory(true);
                  setCategoryDropdownOpen(false);
                }}
              >
                ＋ Add Custom Category
              </button>
            </div>
          )}
        </div>
      ) : (
        <div class="space-y-2">
          <div class="flex gap-2">
            <input
              value={customDeepCategory()}
              onInput={(e) => setCustomDeepCategory(e.currentTarget.value)}
              placeholder={`${selectedCategoryPath() ? selectedCategoryPath() + " > " : ""}Enter custom category`}
              class="border rounded-md px-2 py-1 flex-1"
            />
            <button
              type="button"
              class="px-3 py-1 bg-blue-500 text-white rounded-md"
              onClick={handleAddCustomCategory}
            >
              Add
            </button>
            <button
              type="button"
              class="px-3 py-1 border rounded-md"
              onClick={() => {
                setShowCustomDeepCategory(false);
                setCustomDeepCategory("");
              }}
            >
              Cancel
            </button>
          </div>
          {selectedCategoryPath() && (
            <p class="text-sm text-gray-500">Will be added under: {selectedCategoryPath()}</p>
          )}
        </div>
      )}
    </div>
  );
};
