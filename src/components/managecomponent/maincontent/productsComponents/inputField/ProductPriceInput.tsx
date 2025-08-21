import { useProductContext } from '@/contexts/ProductContext';

export const ProductPriceInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Price
      </label>
      <input
        type="number"
        step="0.01"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={productFormData.ProductPrice || ''}
        onChange={e => setProductFormData(prev => ({ ...prev, ProductPrice: e.target.value }))}
        placeholder="0.00"
      />
    </div>
  );
}; 