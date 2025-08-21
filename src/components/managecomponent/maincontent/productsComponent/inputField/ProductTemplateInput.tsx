import { useProductContext } from '../../../../contexts/ProductContext';
import { templateOptions } from '../../../../lib/form-data';
import type { ProductFormData } from '../../../../contexts/ProductContext';

export const ProductTemplateInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const templates = templateOptions?.ProductDetails ?? [];

  return (
    <div>
      <label class="block mb-1 font-medium">Template *</label>
      <select
        value={productFormData().template || ''}
        onChange={(e) =>
          setProductFormData((prev:ProductFormData) => ({ ...prev, template: e.target.value }))
        }
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Select a template
        </option>
        {templates.length > 0 ? (
          templates.map((template: string) => (
            <option value={template}>
              {template}
            </option>
          ))
        ) : (
          <option disabled>No templates available</option>
        )}
      </select>
    </div>
  );
};
