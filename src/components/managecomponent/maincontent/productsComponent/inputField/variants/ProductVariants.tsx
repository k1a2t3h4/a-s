import { useProductVariantContext } from '../../../../../contexts/ProductVariantProvider';
import VariantOptions from './options/VariantOptions';
import VariantCombinationsTable from './table/VariantCombinationsTable';


const ProductVariants = () => {
  const { variantOptions, addVariantOption, variantCombinations, editingComboIndex } = useProductVariantContext();

  return (
    <>
      {/* Variant Options Card */}
      <div class="rounded-2xl shadow p-4 bg-white mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Variant Options</h2>
          <button
            type="button"
            onClick={addVariantOption}
            class="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={variantOptions.length >= 3}
          >
            <span class="mr-1">＋</span> Add Variant
          </button>
        </div>
        <VariantOptions />
      </div>

      {/* Variant Combinations */}
      {variantCombinations.length > 0 && (
        <div class="rounded-2xl shadow p-4 bg-white mb-4">
          <div class="mb-2">
            <h2 class="text-lg font-semibold">
              Variant Combinations ({variantCombinations.length})
            </h2>
          </div>
          <VariantCombinationsTable />
        </div>
      )}
    </>
  );
};

export default ProductVariants;
