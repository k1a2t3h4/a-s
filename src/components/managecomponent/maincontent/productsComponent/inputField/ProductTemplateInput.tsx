import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { templateOptions } from '@/lib/form-data';

export const ProductTemplateInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  const templates = templateOptions?.ProductDetails ?? [];

  return (
    <div>
      <Label>Template *</Label>
      <Select
        value={productFormData.template || ''}
        onValueChange={value => setProductFormData(prev => ({ ...prev, template: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {templates.length > 0
            ? templates.map((template: string) => (
                <SelectItem key={template} value={template}>
                  {template}
                </SelectItem>
              ))
            : <div className="px-2 py-1 text-gray-400">No templates available</div>
          }
        </SelectContent>
      </Select>
    </div>
  );
};