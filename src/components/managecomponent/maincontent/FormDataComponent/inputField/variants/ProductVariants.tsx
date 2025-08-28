import { useProductContext } from '../../../../../contexts/FormDataContext';
import VariantOptions from './options/VariantOptions';
import VariantCombinationsTable from './table/VariantCombinationsTable';


const ProductVariants = () => {
  const {productFormData,setProductFormData} = useProductContext();
  const addVariantOption = () => {
    const emptyOption = productFormData().variantOptions?.find(v => v.values.length === 0);
    if(emptyOption)
    {
      return;
    }
    if (productFormData().variantOptions!.length >= 3){
      console.log("already 3 added");
      return;
    } 
  
    const newVariant = { id: Date.now().toString(), name: '', values: [] };
    const updatedOptions = [...productFormData().variantOptions??[], newVariant];
    
    setProductFormData({ ...productFormData(), variantOptions: updatedOptions });
  };
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
            disabled={productFormData().variantOptions!.length >= 3}
          >
            <span class="mr-1">＋</span> Add Variant
          </button>
        </div>
        <VariantOptions />
      </div>

      {/* Variant Combinations */}
      {productFormData().variantCombinations!.length > 0 && (
        <div class="rounded-2xl shadow p-4 bg-white mb-4">
          <div class="mb-2">
            <h2 class="text-lg font-semibold">
              Variant Combinations ({productFormData().variantCombinations!.length})
            </h2>
          </div>
          {productFormData().variantCombinations!.length!==0 &&(
          <VariantCombinationsTable />
          )}
        </div>
      )}
    </>
  );
};

export default ProductVariants;
