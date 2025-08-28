import { useProductContext } from '../../../../contexts/FormDataContext';

export const ProductStatusInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <label class="block text-sm font-medium mb-1">Status</label>
      <select
        class="border border-gray-300 rounded-md p-2 w-full"
        value={productFormData().status || 'active'}
        onInput={(e) =>
          setProductFormData((prev) => ({ ...prev, status: e.currentTarget.value }))
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  );
};
