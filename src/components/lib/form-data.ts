
export const countryList = [
  // Top economy countries first
  { code: "US", name: "United States" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "DE", name: "Germany" },
  { code: "IN", name: "India" },
  { code: "UK", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  // Alphabetical list of all other countries
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "GE", name: "Georgia" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KW", name: "Kuwait" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MY", name: "Malaysia" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MA", name: "Morocco" },
  { code: "MM", name: "Myanmar" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZW", name: "Zimbabwe" }
];

export const categoryStructure = {
  clothing: {
    name: "Clothing",
    children: {
      tops: {
        name: "Tops",
        children: {
          tshirts: {
            name: "T-Shirts",
            children: {
              cotton: {
                name: "Cotton",
                children: {
                  organic: {
                    name: "Organic",
                    children: {}
                  },
                  regular: {
                    name: "Regular",
                    children: {}
                  }
                }
              },
              polyester: {
                name: "Polyester",
                children: {
                  sport: {
                    name: "Sport",
                    children: {}
                  },
                  casual: {
                    name: "Casual",
                    children: {}
                  }
                }
              }
            }
          },
          shirts: {
            name: "Shirts",
            children: {}
          },
          polos: {
            name: "Polos",
            children: {}
          },
          hoodies: {
            name: "Hoodies",
            children: {}
          }
        }
      },
      bottoms: {
        name: "Bottoms",
        children: {
          jeans: {
            name: "Jeans",
            children: {}
          },
          pants: {
            name: "Pants",
            children: {}
          },
          shorts: {
            name: "Shorts",
            children: {}
          }
        }
      },
      dresses: {
        name: "Dresses",
        children: {}
      },
      outerwear: {
        name: "Outerwear",
        children: {
          jackets: {
            name: "Jackets",
            children: {}
          },
          coats: {
            name: "Coats",
            children: {}
          }
        }
      }
    }
  },
  fashion: {
    name: "Fashion",
    children: {
      accessories: {
        name: "Accessories",
        children: {
          bags: {
            name: "Bags",
            children: {}
          },
          jewelry: {
            name: "Jewelry",
            children: {}
          },
          watches: {
            name: "Watches",
            children: {}
          }
        }
      },
      footwear: {
        name: "Footwear",
        children: {
          sneakers: {
            name: "Sneakers",
            children: {}
          },
          boots: {
            name: "Boots",
            children: {}
          },
          sandals: {
            name: "Sandals",
            children: {}
          }
        }
      }
    }
  },
  electronics: {
    name: "Electronics",
    children: {
      phones: {
        name: "Phones",
        children: {
          smartphones: {
            name: "Smartphones",
            children: {
              apple: {
                name: "Apple",
                children: {
                  iphone_15: {
                    name: "iPhone 15",
                    children: {}
                  },
                  iphone_14: {
                    name: "iPhone 14",
                    children: {}
                  }
                }
              },
              samsung: {
                name: "Samsung",
                children: {
                  galaxy_s24: {
                    name: "Galaxy S24",
                    children: {}
                  },
                  galaxy_s23: {
                    name: "Galaxy S23",
                    children: {}
                  }
                }
              }
            }
          },
          accessories: {
            name: "Accessories",
            children: {}
          }
        }
      },
      computers: {
        name: "Computers",
        children: {
          laptops: {
            name: "Laptops",
            children: {}
          },
          desktops: {
            name: "Desktops",
            children: {}
          }
        }
      },
      audio: {
        name: "Audio",
        children: {
          headphones: {
            name: "Headphones",
            children: {}
          },
          speakers: {
            name: "Speakers",
            children: {}
          }
        }
      }
    }
  },
  home: {
    name: "Home & Garden",
    children: {
      kitchen: {
        name: "Kitchen",
        children: {
          appliances: {
            name: "Appliances",
            children: {}
          },
          cookware: {
            name: "Cookware",
            children: {}
          }
        }
      },
      furniture: {
        name: "Furniture",
        children: {
          chairs: {
            name: "Chairs",
            children: {}
          },
          tables: {
            name: "Tables",
            children: {}
          }
        }
      },
      decor: {
        name: "Decor",
        children: {
          lighting: {
            name: "Lighting",
            children: {}
          },
          art: {
            name: "Art",
            children: {}
          }
        }
      }
    }
  }
};


export const tagsByProduct: Record<string, string[]> = {};

export const collectionsByProduct: Record<string, string[]> = {};

export const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Draft", label: "Draft" },
  { value: "Archive", label: "Archive" }
];

export const templateOptions: Record<string, string[]> = {
  home: [
    "default-template",
    "modern-home-template",
    "classic-home-template",
    "minimal-home-template"
  ],
  ProductDetails: [
    "default-template",
    "modern-product-template",
    "classic-product-template",
    "minimal-product-template"
  ],
  cart: [
    "default-template",
    "modern-cart-template",
    "classic-cart-template",
    "minimal-cart-template"
  ],
  checkout: [
    "default-template",
    "modern-checkout-template",
    "classic-checkout-template",
    "minimal-checkout-template"
  ],
  collection: [
    "default-template",
    "grid-collection-template",
    "list-collection-template",
    "minimal-collection-template"
  ],
  about: [
    "default-template",
    "team-template",
    "story-template",
    "minimal-template"
  ],
  contact: [
    "default-template",
    "form-template",
    "map-template",
    "minimal-template"
  ],
  profile: [
    "default-template",
    "dashboard-template",
    "account-settings-template",
    "minimal-template"
  ],
  bloglist: [
    "default-template",
    "grid-bloglist-template",
    "list-bloglist-template",
    "minimal-bloglist-template"
  ],
  blog: [
    "default-template",
    "modern-blog-template",
    "classic-blog-template",
    "minimal-blog-template"
  ],
  myOrders: [
    "default-template",
    "orders-table-template",
    "history-list-template",
    "minimal-template"
  ],
  trackOrder: [
    "default-template",
    "map-tracking-template",
    "step-tracking-template",
    "minimal-template"
  ],
  faq: [
    "default-template",
    "accordion-template",
    "category-faq-template",
    "minimal-template"
  ],
  terms: [
    "default-template",
    "legal-template",
    "text-heavy-template",
    "minimal-template"
  ],
  privacy: [
    "default-template",
    "privacy-template",
    "policy-template",
    "minimal-template"
  ]
};


export const weightUnits = ["kg", "lb", "g", "oz"];

// Marketplace structure
export interface Marketplace {
  id: string;
  name: string;
  mode: 'custom' | 'international';
  status: 'active' | 'draft';
  countries: string[]; // country names
}

// Only one active, rest are draft
export const marketplaces: { active: Marketplace | null; draft: Marketplace[] } = {
  active: 
  {
    id: 'marketplace-2',
    name: 'North America',
    mode: 'custom',
    status: 'draft',
    countries: ['United States', 'Canada', 'Mexico']
  },
 
  draft: [
    {
      id: 'marketplace-1',
      name: 'Global Marketplace',
      mode: 'international',
      status: 'active',
      countries: [] // Empty for international mode - will use all countries
    },
    {
      id: 'marketplace-3',
      name: 'European Union',
      mode: 'custom',
      status: 'draft',
      countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Denmark', 'Sweden', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Croatia', 'Slovakia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Cyprus', 'Ireland', 'Portugal', 'Greece']
    },
    {
      id: 'marketplace-4',
      name: 'Asia Pacific',
      mode: 'custom',
      status: 'draft',
      countries: ['China', 'Japan', 'India', 'Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'South Korea']
    }
  ]
};

// Helper to get available country names from the single active marketplace
export const getAvailableCountryNamesFromActiveMarketplace = (): string[] => {
  const { active } = marketplaces;
  if (!active) return [];
  if (active.mode === 'international') {
    return countryList.map(c => c.name);
  }
  return active.countries;
};

// Helper to get country objects from names
export const getCountriesFromNames = (countryNames: string[]) => {
  return countryList.filter(country => countryNames.includes(country.name));
};

export const generateId = (prefix: string = 'ID'): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${random}`;
};

// Helper functions for managing tags and collections


export const addTagToGlobalListByProduct = (tag: string, productGroupId: string) => {
   if (!tagsByProduct[tag]) {
    tagsByProduct[tag] = [];
   }
   if (!tagsByProduct[tag].includes(productGroupId)) {
    tagsByProduct[tag].push(productGroupId);
    localStorage.setItem('tagsByProduct', JSON.stringify(tagsByProduct));
   }
};

export const addCollectionToGlobalListByProduct = (collection: string, productGroupId: string) => {
  if (!collectionsByProduct[collection]) {
    collectionsByProduct[collection] = [];
  }
  if (!collectionsByProduct[collection].includes(productGroupId)) {
    collectionsByProduct[collection].push(productGroupId);
    localStorage.setItem('collectionsByProduct', JSON.stringify(collectionsByProduct));
  }
};

// Type definition for category structure
type CategoryNode = {
  name: string;
  children: Record<string, CategoryNode>;
};

// Helper function to get category path as string
export const getCategoryPath = (categoryStructure: Record<string, CategoryNode>, path: string[]): string => {
  const pathNames: string[] = [];
  let currentLevel = categoryStructure;
  
  for (const key of path) {
    if (currentLevel[key]) {
      pathNames.push(currentLevel[key].name);
      currentLevel = currentLevel[key].children;
    } else {
      pathNames.push(key);
    }
  }
  
  return pathNames.join(' > ');
};

// Helper function to check if category has children
export const hasChildren = (category: CategoryNode): boolean => {
  return category && category.children && Object.keys(category.children).length > 0;
};

// Helper function to get all possible category paths
export const getAllCategoryPaths = (structure: Record<string, CategoryNode>, currentPath: string[] = []): string[] => {
  const paths: string[] = [];
  
  for (const [key, category] of Object.entries(structure)) {
    const newPath = [...currentPath, key];
    const pathString = getCategoryPath(structure, newPath);
    
    if (hasChildren(category)) {
      paths.push(...getAllCategoryPaths(category.children, newPath));
    } else {
      paths.push(pathString);
    }
  }
  
  return paths;
};

// Parse complex category structure string
export const parseCategoryStructure = (input: string): any[] => {
  const result: any[] = [];
  let current = 0;
  
  const parseNode = (): any => {
    const node: any = { name: '', children: [] };
    let name = '';
    
    // Skip whitespace
    while (current < input.length && /\s/.test(input[current])) current++;
    
    // Check if we're starting with a parenthesis (nested structure)
    if (current < input.length && input[current] === '(') {
      current++; // Skip '('
      const nested = parseNode();
      node.name = nested.name;
      node.children = nested.children;
      
      // Skip closing parenthesis
      if (current < input.length && input[current] === ')') current++;
    } else {
      // Parse simple name
      while (current < input.length && !/[>(),]/.test(input[current])) {
        name += input[current];
        current++;
      }
      node.name = name.trim();
    }
    
    // Skip whitespace
    while (current < input.length && /\s/.test(input[current])) current++;
    
    // Check for '>' (children)
    if (current < input.length && input[current] === '>') {
      current++; // Skip '>'
      // Skip whitespace
      while (current < input.length && /\s/.test(input[current])) current++;
      
      // Parse children (comma-separated)
      while (current < input.length && input[current] !== ')') {
        const child = parseNode();
        node.children.push(child);
        
        // Skip whitespace
        while (current < input.length && /\s/.test(input[current])) current++;
        
        // Check for comma separator
        if (current < input.length && input[current] === ',') {
          current++; // Skip ','
          // Skip whitespace
          while (current < input.length && /\s/.test(input[current])) current++;
        } else if (current < input.length && input[current] !== ')') {
          break; // No comma, end of children
        }
      }
    }
    
    return node;
  };
  
  // Parse multiple top-level nodes (comma-separated)
  while (current < input.length) {
    const node = parseNode();
    result.push(node);
    
    // Skip whitespace
    while (current < input.length && /\s/.test(input[current])) current++;
    
    // Check for comma separator
    if (current < input.length && input[current] === ',') {
      current++; // Skip ','
      // Skip whitespace
      while (current < input.length && /\s/.test(input[current])) current++;
    } else {
      break; // No comma, end of parsing
    }
  }
  
  return result;
};

// Add parsed categories to structure
const addParsedCategories = (parsedCategories: any[], targetLevel: any) => {
  for (const category of parsedCategories) {
    const categoryKey = category.name.toLowerCase().replace(/\s+/g, '_');
    
    if (!targetLevel[categoryKey]) {
      targetLevel[categoryKey] = {
        name: category.name,
        children: {}
      };
    }
    
    // Add children recursively
    if (category.children && category.children.length > 0) {
      addParsedCategories(category.children, targetLevel[categoryKey].children);
    }
  }
};

export const addCategoryToStructure = (categoryPath: string, parentPath: string[] = []) => {
  console.log('addCategoryToStructure called with:', { categoryPath, parentPath });
  
  // Check if the input contains complex syntax (>, (), ,)
  if (/[>(),]/.test(categoryPath)) {
    console.log('Detected complex category syntax, parsing...');
    
    let currentLevel:any = categoryStructure;
    let currentPath: string[] = [];
    
    // Navigate to parent level using the parentPath
    for (const parentKey of parentPath) {
      console.log('Looking for parent key:', parentKey, 'at current level:', Object.keys(currentLevel));
      if (currentLevel[parentKey] && currentLevel[parentKey].children) {
        currentLevel = currentLevel[parentKey].children;
        currentPath.push(parentKey);
        console.log('Found parent, navigating to children. Current path:', currentPath);
      } else {
        console.error('Parent path not found:', parentKey, 'at level:', currentPath.join(' > '));
        console.error('Available keys at current level:', Object.keys(currentLevel));
        return;
      }
    }
    
    // Parse the complex structure
    try {
      const parsedCategories = parseCategoryStructure(categoryPath);
      console.log('Parsed categories:', JSON.stringify(parsedCategories, null, 2));
      
      // Add the parsed categories to the target level
      addParsedCategories(parsedCategories, currentLevel);
      
      console.log('Successfully added complex category structure at level:', currentPath.join(' > '));
      
      // Verify the categories were added correctly
      console.log('Verification - available categories at target level:', Object.keys(currentLevel));
    } catch (error) {
      console.error('Error parsing category structure:', error);
    }
  } else {
    // Simple category (original logic)
    const pathParts = categoryPath.split(' > ');
    
    if (pathParts.length === 0) return;
    
    let currentLevel:any = categoryStructure;
    let currentPath: string[] = [];
    
    console.log('Starting navigation from root level');
    
    // Navigate to parent level using the parentPath
    for (const parentKey of parentPath) {
      console.log('Looking for parent key:', parentKey, 'at current level:', Object.keys(currentLevel));
      if (currentLevel[parentKey] && currentLevel[parentKey].children) {
        currentLevel = currentLevel[parentKey].children;
        currentPath.push(parentKey);
        console.log('Found parent, navigating to children. Current path:', currentPath);
      } else {
        console.error('Parent path not found:', parentKey, 'at level:', currentPath.join(' > '));
        console.error('Available keys at current level:', Object.keys(currentLevel));
        return;
      }
    }
    
    // Add new category at the current level
    const newCategoryKey = pathParts[pathParts.length - 1].toLowerCase().replace(/\s+/g, '_');
    console.log('Adding new category with key:', newCategoryKey, 'name:', pathParts[pathParts.length - 1]);
    console.log('At level:', currentPath.join(' > '));
    
    if (!currentLevel[newCategoryKey]) {
      currentLevel[newCategoryKey] = {
        name: pathParts[pathParts.length - 1],
        children: {}
      };
      console.log('Successfully added category:', pathParts[pathParts.length - 1], 'at level:', currentPath.join(' > '));
      
      // Verify the category was added correctly
      let verifyLevel:any = categoryStructure;
      for (const pathKey of currentPath) {
        verifyLevel = verifyLevel[pathKey].children;
      }
      console.log('Verification - available categories at target level:', Object.keys(verifyLevel));
    } else {
      console.log('Category already exists:', pathParts[pathParts.length - 1], 'at level:', currentPath.join(' > '));
    }
  }
};

export const getAvailableTagsByProduct = (): string[] => {
  try {
    const tags = localStorage.getItem('tagsByProduct');
    if (tags) {
      Object.assign(tagsByProduct, JSON.parse(tags));
    }
  } catch (e) {
    console.warn('Invalid tagsByProduct in localStorage; resetting');
    localStorage.removeItem('tagsByProduct');
  }
  return Object.keys(tagsByProduct);
};

// Get all available collections for suggestions
export const getAvailableCollectionsByProduct = (): string[] => {
  try {
    const collections = localStorage.getItem('collectionsByProduct');
    if (collections) {
      Object.assign(collectionsByProduct, JSON.parse(collections));
    }
  } catch (e) {
    console.warn('Invalid collectionsByProduct in localStorage; resetting');
    localStorage.removeItem('collectionsByProduct');
  }
  return Object.keys(collectionsByProduct);
};

// --- Sample notification and message data for UI badge counts ---
export const myNotificationData = [
  { id: 'notif-1', type: 'info', message: 'Welcome to Theme Market!', read: false, createdAt: new Date().toISOString() },
  { id: 'notif-2', type: 'success', message: 'Your theme was approved!', read: false, createdAt: new Date().toISOString() },
  { id: 'notif-3', type: 'warning', message: 'Profile incomplete.', read: true, createdAt: new Date().toISOString() },
];

export const myMessageData = [
  { id: 'msg-1', from: 'user-2', content: 'Hey, love your new theme!', read: false, createdAt: new Date().toISOString() },
  { id: 'msg-2', from: 'user-3', content: 'Can you help with customization?', read: false, createdAt: new Date().toISOString() },
  { id: 'msg-3', from: 'user-4', content: 'Thanks for the update!', read: true, createdAt: new Date().toISOString() },
];


