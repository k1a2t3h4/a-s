import { useFormContext } from '../../../../../../../contexts/FormDataContext';

type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};
export const ProductVarientNameInput = (props:Props) => {
  const { formdata } = useFormContext();
  const combination = formdata()!.variantCombinations![props.index];
  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Product Name *
      </label>
      <input
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={combination.variantName || ''}
        onInput={(e) =>
          props.updateCombination(props.index, "variantName", (e.target as HTMLInputElement).value)
        }
        placeholder="Enter product name"
      />
    </div>
  );
};  