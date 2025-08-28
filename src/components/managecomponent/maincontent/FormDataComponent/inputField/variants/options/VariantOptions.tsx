import { For, createSignal } from "solid-js";
import { useProductContext } from "../../../../../../contexts/FormDataContext";
import { VendorDetailsList } from "../../../../../../lib/product-data";
import { nanoid } from "nanoid";
const VariantOptions = () => {
  const {
    productFormData,
    setProductFormData,
  } = useProductContext();

  const firstVendorName = Object.keys(VendorDetailsList)[0] || 'Default Vendor';
  const generateNextProductId = () => {
    return `P${nanoid()}`;
  };
  const [variantNameNoValueErrorIds, setVariantNameNoValueErrorIds] = createSignal<string[]>([]);
  // --- Combination Generation ---
  const generateSmartVariantCombinations = (options: any[], existingCombinations: any[]) => {
    if (!options || options.length === 0){
      setProductFormData({...productFormData(),variantCombinations:[]})
    } 
    console.log(options)
    const newCombinations: any[] = [];
    const existingCombinationsMap = new Map<string, any>();
    existingCombinations.forEach(combo => {
      const key = JSON.stringify(combo.combination);
      existingCombinationsMap.set(key, combo);
    });
  
    function generateCombos(opts: any[], currentCombo: Record<string, string> = {}, index: number = 0) {
      if (index === opts.length) {
        const combinationKey = JSON.stringify(currentCombo);
        const existingCombo = existingCombinationsMap.get(combinationKey);
        if (existingCombo) {
          newCombinations.push(existingCombo);
        } else {
          newCombinations.push({
            combination: { ...currentCombo },
            variantId: generateNextProductId(),
            varientmedia: [],
            variantavailableLocations:productFormData().availableLocations,
            image: '',
            enabled: true,
            price: '',
            compareAtPrice: '',
            costPerItem: '',
            trackQuantity: true,
            availableQuantity: '',
            shopLocation: '',
            continueSellingOutOfStock: false,
            hasSKUBarcode: false,
            sku: '',
            barcode: '',
            isPhysical: false,
            weight: '',
            weightUnit: 'kg',
            height: '',
            breadth: '',
            length: '',
            dimensionUnit: 'cm',
            hasHSCode: false,
            countryOfOrigin: '',
            hsCode: '',
            vendor: firstVendorName,
          });
        }
        return;
      }
      const option = opts[index];
      for (const value of option.values) {
        generateCombos(opts, { ...currentCombo, [option.name]: value }, index + 1);
      }
    }
  
    generateCombos(options);
    setProductFormData({...productFormData(),variantCombinations:newCombinations})
  };

  const getVariantNameError = (id: string, name: string) => {
    const lowerName = name.trim().toLowerCase();
    if (!lowerName) return '';
    const isDuplicate = productFormData().variantOptions?.some(
      variant => variant.id !== id && variant.name.trim().toLowerCase() === lowerName
    );
    return isDuplicate ? `Variant option name "${name}" already exists. Please use a unique name.` : '';
  };
  
  const getVariantOptionValueError = (variant: any) => {
    return variant.values.length === 0 ? 'Please add at least one value for this option.' : '';
  };
  
  // --- Variant Option Manipulation ---
  
  
  
  const updateVariantName = (id: string, name: string) => {
    const lowerName = name.trim().toLowerCase();
    if (!lowerName) return '';
    
    const isDuplicatename = productFormData().variantOptions?.some(
      variant => variant.id !== id && variant.name.trim().toLowerCase() === lowerName
    );
    if (isDuplicatename) {
      return;
    }
    const isDuplicateValue = productFormData().variantOptions?.some(variant =>
      variant.values.some(v => v.trim().toLowerCase() === lowerName)
    );
    if (isDuplicateValue) {
      return; // duplicate variant value found
    }
    const oldName = productFormData().variantOptions?.find(v => v.id === id)?.name;
  
    // ✅ update variantOptions
    const updatedOptions = productFormData().variantOptions?.map(variant =>
      variant.id === id ? { ...variant, name } : variant
    );
  
    // ✅ update variantCombinations (rename key if exists)
    const updatedCombinations = (productFormData().variantCombinations || []).map(combo => {
      if (!oldName || !(combo.combination && oldName in combo.combination)) {
        return combo;
      }
  
      const updatedCombination: Record<string, string> = {};
  
      for (const [key, value] of Object.entries(combo.combination)) {
        if (key === oldName) {
          updatedCombination[name] = value; // rename the key
        } else {
          updatedCombination[key] = value;  // keep other keys
        }
      }
  
      return {
        ...combo,
        combination: updatedCombination
      };
    });
  
    // ✅ set updated state
    setProductFormData({
      ...productFormData(),
      variantOptions: updatedOptions,
      variantCombinations: updatedCombinations
    });
  
    if (name.trim().length > 0) {
      setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
    }
  };
  
  
  const addVariantValue = (id: string, value: string) => {
    if (!value.trim()) return;
    const option = productFormData().variantOptions?.find(v => v.id === id);
    if (!option || option.name.trim().length === 0) {
      setVariantNameNoValueErrorIds(prev => prev.includes(id) ? prev : [...prev, id]);
      return;
    }
    const lowerName = value.trim().toLowerCase();
    const isDuplicate = productFormData().variantOptions?.some(
      variant => variant.name.trim().toLowerCase() === lowerName
    );
    if(isDuplicate)
    {
      return;
    }
    const updated = productFormData().variantOptions?.map(variant =>
      variant.id === id && !variant.values.includes(value.trim())
        ? { ...variant, values: [...variant.values, value.trim()] }
        : variant
    );

    setProductFormData({ ...productFormData(), variantOptions: updated });
    generateSmartVariantCombinations(updated!, productFormData().variantCombinations??[]);
    setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
  };
  
  const removelast_option_value=(name:string)=>{
    const updatedCombinationsMap: Record<string, any> = {};
      
        for (const combo of productFormData().variantCombinations || []) {
          const combination = combo.combination || {};
      
          // Create new combination without removed key
          const newCombination: Record<string, string> = {};
          for (const [key, value] of Object.entries(combination)) {
            if (key !== name) newCombination[key] = value;
          }
      
          // Deduplicate by combination values of remaining keys
          const keyString = JSON.stringify(newCombination);
          if (!updatedCombinationsMap[keyString]) {
            updatedCombinationsMap[keyString] = { ...combo, combination: newCombination };
          }
        }
      
        const updatedCombinations = Object.values(updatedCombinationsMap);
        setProductFormData({
          ...productFormData(),
          variantCombinations: updatedCombinations,
        });
  }

  const removeVariantValue = (id: string, valueIndex: number) => {
    const updated = productFormData().variantOptions?.map(variant =>
      variant.id === id
        ? { ...variant, values: variant.values.filter((_: any, index: any) => index !== valueIndex) }
        : variant
    );
    const itslastoption= updated!.length===1;
    const current = updated?.find(v => v.id === id);
    if(itslastoption && current && current.values.length ===0)
    {
      setProductFormData({ ...productFormData(),variantCombinations:[] });
    }
    else if (current && current.values.length > 0) {
      generateSmartVariantCombinations(updated!, productFormData().variantCombinations ?? []);
    } else {
      const optionToRemove = productFormData().variantOptions?.find(v => v.id === id);
      if (optionToRemove) {
        removelast_option_value(optionToRemove.name);
      }
    }
    
    setProductFormData({ ...productFormData(), variantOptions: updated });
  };
  
  const removeVariantOption = (id: string) => {
    const optionToRemove = productFormData().variantOptions?.find(v => v.id === id);
    if (!optionToRemove) return;
  
    const removedName = optionToRemove.name;
  
    // Update variantOptions
    const updatedVariantOptions = productFormData().variantOptions?.filter(v => v.id !== id);
    if (!updatedVariantOptions || updatedVariantOptions.length === 0) {
      setProductFormData({ ...productFormData(), variantOptions: [], variantCombinations: [] });
      return;
    }
    removelast_option_value(removedName)
    // Update variantCombinations
    
    setProductFormData({
      ...productFormData(),
      variantOptions: updatedVariantOptions,
    });
  
  };
  const updateVariantValue = (variantId: string, oldValue: string, newValue: string) => {
    if (!newValue.trim()) return;
  
    const lowerName = newValue.trim().toLowerCase();
    const isDuplicate = productFormData().variantOptions?.some(
      variant => variant.name.trim().toLowerCase() === lowerName
    );
    if(isDuplicate)
    {
      return;
    }

    const trimmedValue = newValue.trim();
    if (!trimmedValue) return;
  
    const variant = productFormData().variantOptions?.find(v => v.id === variantId);
    if (!variant) return;
  
    if (variant.values.includes(trimmedValue)) {
      return; 
    }

    const updatedVariants = productFormData().variantOptions?.map(v => {
      if (v.id === variantId) {
        const newValues = v.values.map(val => (val === oldValue ? newValue : val));
        return { ...v, values: newValues };
      }
      return v;
    });
  
    // Update variantCombinations: rename oldValue key in each combination
    const updatedCombinations = (productFormData().variantCombinations || []).map(combo => {
      const newCombination: Record<string, string> = { ...combo.combination };
      // Find the option that matches this variant
      const variantName = productFormData().variantOptions?.find(v => v.id === variantId)?.name;
      if (variantName && newCombination[variantName] === oldValue) {
        newCombination[variantName] = newValue;
      }
      return { ...combo, combination: newCombination };
    });
  
    setProductFormData({
      ...productFormData(),
      variantOptions: updatedVariants,
      variantCombinations: updatedCombinations,
    });
  };
  const [draggedVariant, setDraggedVariant] = createSignal<number | null>(null);

const handleDragStart = (index: number) => {
  setDraggedVariant(index);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const handleDrop = (e: DragEvent, dropIndex: number) => {
  e.preventDefault();
  const dragged = draggedVariant();
  if (dragged === null) return;

  const newVariants = [...productFormData().variantOptions ?? []];
  const draggedItem = newVariants[dragged];
  newVariants.splice(dragged, 1);
  newVariants.splice(dropIndex, 0, draggedItem);

  setProductFormData({ ...productFormData(), variantOptions: newVariants });
  setDraggedVariant(null);

  // reorder combinations according to new variant order
  const updatedCombinations = productFormData().variantCombinations?.map(combo => {
    const reorderedCombo: Record<string, string> = {};
    for (const option of newVariants) {
      if (combo.combination.hasOwnProperty(option.name)) {
        reorderedCombo[option.name] = combo.combination[option.name];
      }
    }
    return { ...combo, combination: reorderedCombo };
  });
  setProductFormData({ ...productFormData(), variantCombinations: updatedCombinations });
};

  return (
    <div class="space-y-4">
      <For each={productFormData().variantOptions}>
        {(variant, index) => (
          <div
          class="border rounded-lg p-4 bg-white"
          draggable
          onDragStart={() => handleDragStart(index())}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index())}
        >
            {/* Header: Variant Name */}
            <div class="flex items-center justify-between mb-3">
            <div class="space-y-2">
            <div class="flex gap-2">
              <span class="cursor-move text-gray-400 select-none">⋮⋮</span>
              <input
                value={variant.name}
                type="text"
                onKeyPress={(e) => {
                  if (e.key === "Enter" ) {
                    updateVariantName(variant.id, e.currentTarget.value.trim());
                    e.currentTarget.blur(); // optional: remove focus
                  }
                }}
                required
                class={`w-48 border rounded px-2 py-1 ${
                  getVariantNameError(variant.id, variant.name) ||
                  variantNameNoValueErrorIds().includes(variant.id)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim().length!==0) {
                    updateVariantName(variant.id, input.value.trim());
                  }
                }}
              >
                update
              </button>
            </div>
          </div>

              {/* Remove Option Button */}
              <button
                type="button"
                class="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                onClick={() => removeVariantOption(variant.id)}
              >
                ✕
              </button>
            </div>

            {/* Option Errors */}
            {variantNameNoValueErrorIds().includes(variant.id) &&
              variant.name.trim().length === 0 && (
                <p class="text-red-500 text-xs mt-1">
                  Please enter a name for this option before adding values.
                </p>
              )}
            {variantNameNoValueErrorIds().includes(variant.id) &&
              variant.name.trim().length > 0 && (
                <p class="text-red-500 text-xs mt-1">
                  {getVariantOptionValueError(variant)}
                </p>
              )}

            {/* Values Section */}
            <div class="space-y-2">
              {/* Add New Value */}
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add value"
                  class="flex-1 border rounded px-2 py-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addVariantValue(variant.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  disabled={variant.name.length===0}
                />
                <button
                  type="button"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      addVariantValue(variant.id, input.value);
                      input.value = "";
                    }
                  }}
                  disabled={variant.name.length===0}
                >
                  Add
                </button>
              </div>

              {/* Render Values */}
              <div class="flex flex-wrap gap-2">
                <For each={variant.values}>
                  {(value, vIndex) => {
                    const [isEditing, setIsEditing] = createSignal(false);
                    const [editValue, setEditValue] = createSignal(value);

                    return (
                      <span class="px-2 py-1 text-sm bg-gray-100 border rounded flex items-center gap-1">
                        {isEditing() ? (
                          <input
                            type="text"
                            class="border px-1 py-0.5 rounded text-sm w-16"
                            value={editValue()}
                            onInput={(e) => setEditValue(e.currentTarget.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateVariantValue(
                                  variant.id,
                                  value,
                                  editValue()
                                );
                                setIsEditing(false);
                              } else if (e.key === "Escape") {
                                setIsEditing(false);
                                setEditValue(value);
                              }
                            }}
                          />
                        ) : (
                          <>
                            <span
                              onClick={() => setIsEditing(true)}
                              class="cursor-pointer"
                            >
                              {value}
                            </span>
                            <span
                              class="cursor-pointer text-gray-500 hover:text-red-600"
                              onClick={() =>
                                removeVariantValue(variant.id, vIndex())
                              }
                            >
                              ✕
                            </span>
                          </>
                        )}
                      </span>
                    );
                  }}
                </For>
              </div>
            </div>

            {/* Error for Values */}
            {getVariantOptionValueError(variant) && (
              <p class="text-red-500 text-xs mt-1">
                {getVariantOptionValueError(variant)}
              </p>
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export default VariantOptions;


