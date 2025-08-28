import { useFormContext } from '../../../../contexts/FormDataContext';

export const ProductNameInput = () => {
  const { formdata, setFormData } = useFormContext();
  
  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Product Name *
      </label>
      <input
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={formdata()!.ProductName || ''}
        onChange={e => setFormData(prev => ({ ...prev, ProductName: e.target.value }))}
        placeholder="Enter product name"
      />
    </div>
  );
};  