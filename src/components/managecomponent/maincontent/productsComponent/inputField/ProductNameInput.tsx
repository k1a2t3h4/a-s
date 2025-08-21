import { useProductContext } from '../../../../contexts/ProductContext';

export const ProductNameInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Product Name *
      </label>
      <input
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={productFormData().ProductName || ''}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          setProductFormData({ ...productFormData(), ProductName: target.value });
        }}
        placeholder="Enter product name"
      />
    </div>
  );
}; 