import { useProductContext } from '@/contexts/ProductContext';

export const ProductDescriptionInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Description
      </label>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={productFormData.ProductDescription || ''}
        onChange={e => setProductFormData(prev => ({ ...prev, ProductDescription: e.target.value }))}
        placeholder="Enter product description"
        rows={3}
      />
    </div>
  );
}; 