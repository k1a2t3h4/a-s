import { createSignal, createMemo } from "solid-js";
import { useProductContext } from "../../../../contexts/FormDataContext";
import { getAvailableCountryNamesFromActiveMarketplace } from "../../../../lib/form-data";

export const ProductAvailableLocationsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [search, setSearch] = createSignal("");

  // Always return array of { name: string }
  const availableCountries = createMemo<{ name: string }[]>(() => {
    const names = getAvailableCountryNamesFromActiveMarketplace();
    if (Array.isArray(names)) {
      return names.map((n: any) =>
        typeof n === "string" ? { name: n } : n
      );
    }
    return [];
  });

  const filteredAvailableCountries = createMemo(() => {
    if (!search()) return availableCountries();
    return availableCountries().filter((c) =>
      c.name.toLowerCase().includes(search().toLowerCase())
    );
  });

  const selectedLocations = () => productFormData().availableLocations || [];

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
    <div class="space-y-3">
      <label class="block text-sm font-medium">Available Location</label>
      <p class="text-sm text-gray-600">
        Select locations from active marketplaces where this product will be available:
      </p>

      <div class="border rounded-md p-2 space-y-2">
        <input
          type="text"
          placeholder="Search locations..."
          class="w-full border px-2 py-1 rounded-md"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
        <div class="max-h-40 overflow-y-auto space-y-1">
          {filteredAvailableCountries().length === 0 && (
            <p class="text-gray-400 text-sm">No locations found.</p>
          )}
          {filteredAvailableCountries().map((location) => (
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLocations().some((l) => l.name === location.name)}
                onChange={() => handleLocationSelect(location)}
              />
              <span>{location.name}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedLocations().length > 0 && (
        <div class="flex flex-wrap gap-2">
          {selectedLocations().map((location: { name: string }) => (
            <span class="px-2 py-1 bg-gray-200 rounded-md flex items-center gap-1 text-sm">
              {location.name}
              <button
                class="text-red-500"
                onClick={() => handleLocationSelect(location)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
      {selectedLocations().length === 0 && (
        <p class="text-red-500 text-sm">Please select at least one location</p>
      )}
    </div>
  );
};
