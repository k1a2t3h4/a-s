import { useProductContext } from '../../../../../../../contexts/FormDataContext';

type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};
export const ProductVariantDescriptionInput = (props:Props) => {
  const { productFormData, updateCombination} = useProductContext();
  const combination = productFormData().variantCombinations![props.index];
  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Product Description
      </label>
      <textarea
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={combination.variantDescription || ''}
        onChange={(e) =>
          updateCombination(props.index, "variantDescription", (e.target as HTMLTextAreaElement).value)
        }
        placeholder="Enter product description"
        rows={3}
      />
    </div>
  );
}; 