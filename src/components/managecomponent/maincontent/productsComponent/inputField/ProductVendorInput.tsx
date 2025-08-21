import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { VendorDetailsList } from '@/lib/product-data';

export const ProductVendorInput = () => {
  const { productFormData, setProductFormData } = useProductContext();

  return (
    <div>
      <Label>Vendor *</Label>
      <Select
        value={productFormData.vendor || ''}
        onValueChange={value => setProductFormData(prev => ({ ...prev, vendor: value }))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(VendorDetailsList).map((vendor) => (
            <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 