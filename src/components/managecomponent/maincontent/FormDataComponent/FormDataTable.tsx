import { createSignal, createEffect} from "solid-js";
import { useAppState } from "../../../lib/state";
import { useAuth } from "../../../contexts/AuthContext";
import { loadProducts } from "../../../lib/storage";
import { useFormContext } from "../../../contexts/FormDataContext";

export const FormDataTable = () => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  const [statusFilter, setStatusFilter] = createSignal("All");
  const [products, setProducts] = createSignal<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = createSignal(0);

  const {
    handleAddForm,
    handleDeleteForm,
    handleFormClick,
    selectedForm,
  } = useFormContext();

  // Refresh products from storage
  const refreshProducts = () => {
    if (!user()?.email || !selectedWebsiteId) {
      setProducts([]);
      return;
    }
    const productsData = loadProducts(user()?.email || "");
    setProducts(productsData[selectedWebsiteId] || []);
  };

  // Watch for refresh trigger or selected product changes
  createEffect(() => {
    refreshProducts();
  });

  createEffect(() => {
    selectedForm; // track dependency
    refreshProducts();
  });

  // Custom delete with refresh
  const handleDeleteWithRefresh = (productId: string, productName: string) => {
    handleDeleteForm(productId, productName);
    setRefreshTrigger(refreshTrigger() + 1);
    setTimeout(() => {
      refreshProducts();
    }, 100);
  };

  const filteredProducts = () =>
    products().filter((product) =>
      statusFilter() === "All" ? true : product.status === statusFilter()
    );

  if (!user || !selectedWebsiteId) {
    return (
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="text-center text-gray-500">
          Please log in and select a website to view products.
        </div>
      </div>
    );
  }

  return (
    <div class="p-4 sm:p-6 lg:p-8">
      {/* Header Controls */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Status Filters */}
        <div class="flex flex-wrap gap-2">
          {["All", "active", "inactive", "draft", "archived"].map((status) => (
            <button
              class={`px-3 py-1 rounded text-xs sm:text-sm border ${
                statusFilter() === status
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div class="flex flex-wrap gap-2">
          <button class="px-3 py-1 border rounded text-xs sm:text-sm bg-white hover:bg-gray-100">
            ⬇ Export
          </button>
          <button class="px-3 py-1 border rounded text-xs sm:text-sm bg-white hover:bg-gray-100">
            ⬆ Import
          </button>
          <button
            class="px-3 py-1 rounded bg-blue-600 text-white text-xs sm:text-sm hover:bg-blue-700"
            onClick={handleAddForm}
          >
            ＋ Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts().length === 0 ? (
        <div class="text-center text-gray-500 py-12">
          <div class="max-w-md mx-auto">
            <div class="text-4xl mb-4">📦</div>
            <h3 class="text-lg font-medium mb-2">No products found</h3>
            <p class="text-sm mb-4">Add your first product to get started.</p>
            <button
              class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              onClick={handleAddForm}
            >
              ＋ Add Product
            </button>
          </div>
        </div>
      ) : (
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-2 w-12">
                    <input type="checkbox" />
                  </th>
                  <th class="p-2 w-16 text-left">Image</th>
                  <th class="p-2 text-left">Product Name</th>
                  <th class="p-2 hidden sm:table-cell text-left">Status</th>
                  <th class="p-2 hidden lg:table-cell text-left">Category</th>
                  <th class="p-2 hidden xl:table-cell text-left">
                    Available Locations
                  </th>
                  <th class="p-2 w-20 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts().map((product) => (
                  <tr class="hover:bg-gray-50">
                    <td class="p-2">
                      <input type="checkbox" />
                    </td>
                    <td class="p-2">
                      <img
                        src={product.Globalmedia?.[0]?.url || "/placeholder.svg"}
                        alt={product.ProductName}
                        class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    </td>
                    <td class="p-2">
                      <div class="space-y-1">
                        <button
                          class="text-blue-600 hover:underline text-left"
                          onClick={() => handleFormClick(product.ProductID)}
                        >
                          {product.ProductName}
                        </button>
                        <div class="sm:hidden">
                          <span
                            class={`px-2 py-0.5 rounded text-xs ${
                              product.status === "active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="p-2 hidden sm:table-cell">
                      <span
                        class={`px-2 py-0.5 rounded text-xs ${
                          product.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td class="p-2 hidden lg:table-cell capitalize">
                      {product.Deepcategory || "-"}
                    </td>
                    <td class="p-2 hidden xl:table-cell">
                      <div class="flex flex-wrap gap-1">
                        {product.availableLocations?.slice(0, 2).map(
                          (location: any) => (
                            <span class="px-2 py-0.5 border rounded text-xs">
                              {typeof location === "object"
                                ? location.name
                                : location}
                            </span>
                          )
                        )}
                        {product.availableLocations?.length > 2 && (
                          <span class="px-2 py-0.5 border rounded text-xs">
                            +{product.availableLocations.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="flex space-x-1">
                        <button
                          class="h-8 w-8 p-0 rounded hover:bg-gray-100"
                          title="Edit Product"
                          onClick={() => handleFormClick(product.ProductID)}
                        >
                          ✏
                        </button>
                        <button
                          class="h-8 w-8 p-0 rounded text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete Product"
                          onClick={() =>
                            handleDeleteWithRefresh(
                              product.ProductID,
                              product.ProductName
                            )
                          }
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
