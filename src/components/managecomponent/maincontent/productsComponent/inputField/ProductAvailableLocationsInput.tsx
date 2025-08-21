import React, { useState, useMemo } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { ChevronsUpDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAvailableCountryNamesFromActiveMarketplace, getCountriesFromNames } from '@/lib/form-data';

export const ProductAvailableLocationsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Always return array of { name: string }
  const availableCountries = useMemo<{ name: string }[]>(() => {
    const names = getAvailableCountryNamesFromActiveMarketplace();
    if (Array.isArray(names)) {
      return names.map((n: any) =>
        typeof n === 'string' ? { name: n } : n
      );
    }
    return [];
  }, []);

  const filteredAvailableCountries = useMemo(() => {
    if (!search) return availableCountries;
    return availableCountries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, availableCountries]);

  const selectedLocations = productFormData.availableLocations || [];

  const handleLocationSelect = (location: { name: string }) => {
    setProductFormData((prev: any) => {
      const prevLocations = prev.availableLocations || [];
      let updated;
      if (prevLocations.some((l: { name: string }) => l.name === location.name)) {
        updated = prevLocations.filter((l: { name: string }) => l.name !== location.name);
      } else {
        updated = [...prevLocations, location];
      }
      return { ...prev, availableLocations: updated };
    });
  };

  return (
    <div className="space-y-3">
      <Label>Available Location</Label>
      <p className="text-sm text-gray-600">Select locations from active marketplaces where this product will be available:</p>
      <Popover open={locationDropdownOpen} onOpenChange={setLocationDropdownOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={locationDropdownOpen}
            className="w-full justify-between"
          >
            {selectedLocations.length === 0
              ? "Select locations..."
              : `${selectedLocations.length} location${selectedLocations.length > 1 ? 's' : ''} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search locations..." value={search} onValueChange={setSearch} />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {filteredAvailableCountries?.map((location) => (
                  <CommandItem
                    key={location.name}
                    value={location.name}
                    onSelect={() => handleLocationSelect(location)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLocations.some(l => l.name === location.name) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map((location: { name: string }) => (
            <Badge key={location.name} variant="secondary" className="flex items-center gap-1">
              {location.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleLocationSelect(location)}
              />
            </Badge>
          ))}
        </div>
      )}
      {selectedLocations.length === 0 && (
        <p className="text-red-500 text-sm">Please select at least one location</p>
      )}
    </div>
  );
}; 