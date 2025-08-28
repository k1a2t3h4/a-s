import { useProductContext } from '../../../../../../../contexts/FormDataContext';
type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};
export const ProductVariantStatusInput = (props:Props) => {
  const { productFormData, updateCombination } = useProductContext();
  const combination = productFormData().variantCombinations![props.index];
  return (
    <div>
      <label class="block text-sm font-medium mb-1">Status</label>
      <select
        class="border border-gray-300 rounded-md p-2 w-full"
        value={combination.status || 'active'}
        onInput={(e) =>
          updateCombination(props.index, "status", (e.target as HTMLSelectElement).value)
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  );
};
