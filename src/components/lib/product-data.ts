/**
 * Product management data and schemas
 */

// Products - All products with productGroupId reference
export const ProductsList: Record<string, any> = {
  user1: {
    website1750789264482: [
      {
        "ProductID": "P0000001",
        "ProductName": "P v1",
        "template": "default-tshirt-template",
        "status": "active",
        "minPrice": 799,
        "maxPrice": 1299,
        "detailedDescription": "Detailed description of the variant.",
        "Deepcategory": "Clothing > Tops > Polos",
        "tags": [
          "casual",
          "unisex",
          "cotton"
        ],
        "collections": [
          "New Arrivals",
          "Summer Collection"
        ],
        "availableLocations": [
          "US",
          "IN"
        ],
        "Globalmedia": [
          { type: 'image', url: 'http://images/v1-front.jpg' },
          { type: 'image', url: 'http://images/v1-back.jpg' },
          { type: 'video', url: 'http://videos/v1-spin.mp4' }
        ],
        "variantOptions": [
          {
            "name": "Color",
            "values": [
              "Black",
              "White",
              "Navy"
            ]
          },
          {
            "name": "Size",
            "values": [
              "S",
              "M",
              "L",
              "XL"
            ]
          }
        ],
        "categoryMetafields": {
          "Color": [
            "Black",
            "White",
            "Navy"
          ],
          "Size": [
            "S",
            "M",
            "L",
            "XL"
          ]
        },
        "shipping": {
          "isPhysical": true,
          "weight": 0.25,
          "weightUnit": "kg"
        },
        "alternativevendor": "TeeWorld Inc.",
        "createdAt": "2024-01-15T11:00:00.000Z"
      },
      {
        "ProductID": "P0000002",
        "ProductName": "Premium Hoodie v1",
        "template": "default-hoodie-template",
        "status": "active",
        "minPrice": 1599,
        "maxPrice": 2299,
        "detailedDescription": "High-quality hoodie with premium materials.",
        "Deepcategory": "Clothing > Tops > Hoodies",
        "tags": [
          "premium",
          "warm",
          "casual"
        ],
        "collections": [
          "Winter Collection"
        ],
        "availableLocations": [
          "US",
          "CA",
          "UK"
        ],
        "Globalmedia": [
          { type: 'image', url: 'http://images/hoodie-front.jpg' },
          { type: 'image', url: 'http://images/hoodie-back.jpg' }
        ],
        "variantOptions": [
          {
            "name": "Color",
            "values": [
              "Gray",
              "Black",
              "Maroon"
            ]
          },
          {
            "name": "Size",
            "values": [
              "M",
              "L",
              "XL",
              "XXL"
            ]
          }
        ],
        "categoryMetafields": {
          "Color": [
            "Gray",
            "Black",
            "Maroon"
          ],
          "Size": [
            "M",
            "L",
            "XL",
            "XXL"
          ]
        },
        "shipping": {
          "isPhysical": true,
          "weight": 0.8,
          "weightUnit": "kg"
        },
        "alternativevendor": "ComfortWear Ltd.",
        "createdAt": "2024-01-16T15:30:00.000Z"
      },
      {
        "ProductID": "P0000003",
        "ProductName": "Designer Jeans v1",
        "template": "default-jeans-template",
        "status": "active",
        "minPrice": 2999,
        "maxPrice": 4999,
        "detailedDescription": "High-end designer jeans with premium denim.",
        "Deepcategory": "Clothing > Bottoms > Jeans",
        "tags": [
          "designer",
          "premium",
          "denim"
        ],
        "collections": [
          "Designer Collection"
        ],
        "availableLocations": [
          "US",
          "EU",
          "UK"
        ],
        "Globalmedia": [
          { type: 'image', url: 'http://images/jeans-front.jpg' },
          { type: 'image', url: 'http://images/jeans-side.jpg' }
        ],
        "variantOptions": [
          {
            "name": "Wash",
            "values": [
              "Dark Blue",
              "Light Blue",
              "Black"
            ]
          },
          {
            "name": "Size",
            "values": [
              "28",
              "30",
              "32",
              "34",
              "36"
            ]
          }
        ],
        "categoryMetafields": {
          "Wash": [
            "Dark Blue",
            "Light Blue",
            "Black"
          ],
          "Size": [
            "28",
            "30",
            "32",
            "34",
            "36"
          ]
        },
        "shipping": {
          "isPhysical": true,
          "weight": 0.6,
          "weightUnit": "kg"
        },
        "alternativevendor": "DenimCraft Co.",
        "createdAt": "2024-01-17T10:15:00.000Z"
      }
    ],
    website2: {}
  },
  user2: {},
  user3: {}
};

// ProductVarientCombinationsList - Product variant combinations
export const ProductVariantCombinationsList: Record<string, any> = {
  user1: {
    website1750789264482: {
      P0000001: [
        { 
          "combination": {
            "Color": "Black",
            "Size": "S"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/v1-black-s-front.jpg' },
            { type: 'image', url: 'http://images/v1-black-s-back.jpg' }
          ],
          "price": 799,
          "compareAtPrice": 999,
          "sku": "SKU-Bla-S",
          "barcode": "1234567890123",
          "trackQuantity": true,
          "vendor": "TeeWorld Inc."
        },
        {
          "combination": {
            "Color": "Black",
            "Size": "M"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/v1-black-m-front.jpg' },
            { type: 'image', url: 'http://images/v1-black-m-back.jpg' },
            { type: 'video', url: 'http://videos/v1-spin.mp4' }
          ],
          "price": 799,
          "compareAtPrice": 999,
          "sku": "SKU-Bla-M",
          "barcode": "1234567890124",
          "trackQuantity": true,
          "vendor": "TeeWorld Inc."
        },
        {
          "combination": {
            "Color": "White",
            "Size": "S"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/v1-white-s-front.jpg' },
            { type: 'image', url: 'http://images/v1-white-s-back.jpg' }
          ],
          "price": 799,
          "compareAtPrice": 999,
          "sku": "SKU-Whi-S",
          "barcode": "1234567890125",
          "trackQuantity": true,
          "vendor": "TeeWorld Inc."
        },
        {
          "combination": {
            "Color": "White",
            "Size": "M"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/v1-white-m-front.jpg' },
            { type: 'image', url: 'http://images/v1-white-m-back.jpg' }
          ],
          "price": 799,
          "compareAtPrice": 999,
          "sku": "SKU-Whi-M",
          "barcode": "1234567890126",
          "trackQuantity": true,
          "vendor": "TeeWorld Inc."
        }
      ],
      P0000002: [
        {
          "combination": {
            "Color": "Gray",
            "Size": "M"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/hoodie-gray-m-front.jpg' },
            { type: 'image', url: 'http://images/hoodie-gray-m-back.jpg' }
          ],
          "price": 1599,
          "compareAtPrice": 1999,
          "sku": "SKU-Gray-M",
          "barcode": "2234567890123",
          "trackQuantity": true,
          "vendor": "ComfortWear Ltd."
        },
        {
          "combination": {
            "Color": "Black",
            "Size": "L"
          },
          "Varientmedia": [
            { type: 'image', url: 'http://images/hoodie-black-l-front.jpg' },
            { type: 'image', url: 'http://images/hoodie-black-l-back.jpg' }
          ],
          "price": 1599,
          "compareAtPrice": 1999,
          "sku": "SKU-HBla-L",
          "barcode": "2234567890124",
          "trackQuantity": true,
          "vendor": "ComfortWear Ltd."
        }
      ]
    },
    website2: {}
  },
  user2: {},
  user3: {}
};

// ProductVarientCombinationSKUQuantity - Product variant combinations SKU and quantity
export const ProductVarientCombinationSKUQuantity: Record<string, any> = [
  {
    id:"user1",
    website1750789264482: {
      P0000001: {
        "SKU-Bla-S": 10,
        "SKU-Bla-M": 12,
        "SKU-Whi-S": 8,
        "SKU-Whi-M": 15
      },
      P0000002: {
        "SKU-Gray-M": 5,
        "SKU-HBla-L": 7
      }
    },
    website2: {}
  },
  {
    id:"user2",
    website1750789264482:{
      
    }
  }
];

// VendorDetailsList - Vendor details
export const VendorDetailsList: Record<string, any> = {
  "TeeWorld Inc.": {
    "ownerName": "John Smith",
    "address": {
      "street": "123 Fashion Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "contact": {
      "email": "contact@teeworld.com",
      "phone": "+1-555-0123"
    },
    "description": "Premium t-shirt manufacturer with 15+ years of experience",
    "rating": 4.8,
    "certifications": ["Organic Cotton", "Fair Trade"]
  },
  "ComfortWear Ltd.": {
    "ownerName": "Sarah Johnson",
    "address": {
      "street": "456 Textile Avenue",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90001",
      "country": "USA"
    },
    "contact": {
      "email": "info@comfortwear.com",
      "phone": "+1-555-0456"
    },
    "description": "Specialized in comfortable wear and winter clothing",
    "rating": 4.6,
    "certifications": ["Eco-Friendly", "Sustainable Materials"]
  },
  "DenimCraft Co.": {
    "ownerName": "Michael Brown",
    "address": {
      "street": "789 Denim Road",
      "city": "Chicago",
      "state": "IL",
      "zipCode": "60601",
      "country": "USA"
    },
    "contact": {
      "email": "sales@denimcraft.com",
      "phone": "+1-555-0789"
    },
    "description": "High-end denim manufacturer with premium quality standards",
    "rating": 4.9,
    "certifications": ["Premium Quality", "Designer Approved"]
  }
};
