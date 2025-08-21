import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export const ProductStatusInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <Label>Status</Label>
      <Select
        value={productFormData.status || 'active'}
        onValueChange={value => setProductFormData(prev => ({ ...prev, status: value }))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}; 