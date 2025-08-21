// src/components/products/ProductsTopicHolder.tsx
import { type Component, For, Show } from "solid-js";
import { useProductContext } from "../../../contexts/ProductContext";

export const ProductsTopicHolder: Component = () => {
  const {
    selectedProduct,
    handleBack,
    selectedTopic,
    setSelectedTopic,
  } = useProductContext();

  const mainTopics = [
    { id: "productstablebel", label: "Products Table" },
    { id: "inventory", label: "Inventory Management" },
    { id: "orders", label: "Orders" },
    { id: "analytics", label: "Sales Analytics" },
    { id: "collections", label: "Collections" },
  ];

  const productTopics = [
    { id: "productdetails", label: "Product Details" },
    { id: "variants", label: "Variants & SKU" },
    { id: "inventory", label: "Inventory" },
    { id: "seo", label: "SEO Optimization" },
    { id: "media", label: "Media & Images" },
  ];

  const currentTopics =
    selectedProduct() || selectedTopic() === "productdetails"
      ? productTopics
      : mainTopics;

  const isAddingNewProduct =
    selectedProduct() === null && selectedTopic() === "productdetails";

  return (
    <div class="bg-gray-50 border-b border-gray-200 px-4 py-3 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Back Button */}
        <Show when={selectedProduct() || selectedTopic() === "productdetails"}>
          <button
            onClick={handleBack}
            class="self-start sm:self-auto flex items-center text-gray-700 hover:bg-gray-100 px-3 py-1 rounded text-sm"
          >
            <div class="h-4 w-4 mr-2">←</div>
            <span class="hidden sm:inline">Back to Products</span>
            <span class="sm:hidden">Back</span>
          </button>
        </Show>

        {/* Topic Navigation */}
        <div class="flex-1 min-w-0">
          <div class="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <For each={currentTopics}>
              {(topic) => (
                <button
                  onClick={() => setSelectedTopic(topic.id)}
                  class={`text-sm whitespace-nowrap flex-shrink-0 px-3 sm:px-4 py-1 rounded ${
                    selectedTopic() === topic.id
                      ? "bg-blue-500 text-white"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                  disabled={
                    isAddingNewProduct && topic.id !== "productdetails"
                  }
                >
                  <span class="hidden sm:inline">{topic.label}</span>
                  <span class="sm:hidden">
                    {topic.label.length > 12
                      ? topic.label.substring(0, 12) + "..."
                      : topic.label}
                  </span>
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};
