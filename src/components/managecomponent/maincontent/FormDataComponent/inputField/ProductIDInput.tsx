import { useFormContext } from '../../../../contexts/FormDataContext';

export const ProductIDInput = () => {
  const { formdata } = useFormContext();
  return (
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Product ID
      </label>
      <input
        type="text"
        value={formdata()?.formId || ''}
        disabled
        class="bg-gray-100 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
      />
    </div>
  );
};
