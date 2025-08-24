export interface Theme {
  id: string;
  owner: string;
  name: string;
  description: string;
  categories: string[];
  thumbnail: string;
  tags: string[];
  versions: string[];
  minprice: number;
  maxprice: number;
  numberofsalescount: number;
  impressions: number;
  rating: number; // out of 5
  reviewCount: number;
  createdAt: string;
}

export const themes: Theme[] = [
  {
    id: "theme1",
    owner: "katir004",
    name: "E-commerce Store",
    description: "A complete e-commerce website with product pages, categories, and checkout flow",
    categories: ["e-commerce", "shop", "retail"],
    thumbnail: "http://theme1.jpg",
    tags: ["e-commerce", "shop", "products"],
    versions: ["1.1.1", "1.1.2"],
    minprice: 29,
    maxprice: 59,
    numberofsalescount: 1200,
    impressions: 15000,
    rating: 4.7,
    reviewCount: 320,
    createdAt: "2023-01-15T10:00:00Z"
  },
  {
    id: "theme2",
    owner: "pr002",
    name: "Portfolio",
    description: "A professional portfolio site for creative professionals",
    categories: ["portfolio", "creative", "professional"],
    thumbnail: "http://portfolio.jpg",
    tags: ["portfolio", "creative", "professional"],
    versions: ["1.1.1", "1.1.2"],
    minprice: 19,
    maxprice: 39,
    numberofsalescount: 800,
    impressions: 9000,
    rating: 4.5,
    reviewCount: 210,
    createdAt: "2023-02-10T12:00:00Z"
  },
  {
    id: "theme3",
    owner: "alice01",
    name: "Blog Master",
    description: "A modern blog template for writers and bloggers.",
    categories: ["blog", "personal", "writing"],
    thumbnail: "http://blogmaster.jpg",
    tags: ["blog", "writing", "personal"],
    versions: ["1.0.0", "1.1.0"],
    minprice: 15,
    maxprice: 25,
    numberofsalescount: 500,
    impressions: 7000,
    rating: 4.2,
    reviewCount: 110,
    createdAt: "2023-03-05T09:30:00Z"
  },
  {
    id: "theme4",
    owner: "johnnydev",
    name: "Restaurant Pro",
    description: "A delicious template for restaurants and cafes.",
    categories: ["restaurant", "food", "cafe"],
    thumbnail: "http://restaurantpro.jpg",
    tags: ["restaurant", "food", "cafe"],
    versions: ["2.0.0", "2.1.0"],
    minprice: 25,
    maxprice: 50,
    numberofsalescount: 650,
    impressions: 8000,
    rating: 4.6,
    reviewCount: 150,
    createdAt: "2023-04-12T14:00:00Z"
  },
  {
    id: "theme5",
    owner: "katir004",
    name: "SaaS Launch",
    description: "A landing page for SaaS products and startups.",
    categories: ["saas", "startup", "landing"],
    thumbnail: "http://saaslaunch.jpg",
    tags: ["saas", "startup", "landing"],
    versions: ["1.0.0", "1.2.0"],
    minprice: 22,
    maxprice: 45,
    numberofsalescount: 900,
    impressions: 11000,
    rating: 4.8,
    reviewCount: 200,
    createdAt: "2023-05-20T11:00:00Z"
  },
  {
    id: "theme6",
    owner: "pr002",
    name: "Agency Pro",
    description: "A multi-purpose template for agencies and businesses.",
    categories: ["agency", "business", "corporate"],
    thumbnail: "http://agencypro.jpg",
    tags: ["agency", "business", "corporate"],
    versions: ["1.0.0", "1.1.0", "1.2.0"],
    minprice: 30,
    maxprice: 60,
    numberofsalescount: 1100,
    impressions: 13000,
    rating: 4.9,
    reviewCount: 400,
    createdAt: "2023-06-18T16:00:00Z"
  },
  {
    id: "theme7",
    owner: "alice01",
    name: "Education Hub",
    description: "A template for schools, colleges, and online courses.",
    categories: ["education", "school", "courses"],
    thumbnail: "http://educationhub.jpg",
    tags: ["education", "school", "courses"],
    versions: ["1.0.0", "1.1.0"],
    minprice: 18,
    maxprice: 35,
    numberofsalescount: 400,
    impressions: 6000,
    rating: 4.3,
    reviewCount: 90,
    createdAt: "2023-07-10T08:00:00Z"
  },
  {
    id: "theme8",
    owner: "johnnydev",
    name: "Health Clinic",
    description: "A clean template for clinics and healthcare providers.",
    categories: ["health", "clinic", "medical"],
    thumbnail: "http://healthclinic.jpg",
    tags: ["health", "clinic", "medical"],
    versions: ["1.0.0", "1.1.0"],
    minprice: 20,
    maxprice: 40,
    numberofsalescount: 350,
    impressions: 5000,
    rating: 4.1,
    reviewCount: 70,
    createdAt: "2023-08-01T10:00:00Z"
  },
  {
    id: "theme9",
    owner: "katir004",
    name: "News Portal",
    description: "A news and magazine template for publishers.",
    categories: ["news", "magazine", "media"],
    thumbnail: "http://newsportal.jpg",
    tags: ["news", "magazine", "media"],
    versions: ["1.0.0", "1.1.0"],
    minprice: 17,
    maxprice: 32,
    numberofsalescount: 600,
    impressions: 7500,
    rating: 4.0,
    reviewCount: 60,
    createdAt: "2023-09-15T13:00:00Z"
  },
  {
    id: "theme10",
    owner: "pr002",
    name: "Event Planner",
    description: "A template for event management and planning.",
    categories: ["event", "planner", "management"],
    thumbnail: "http://eventplanner.jpg",
    tags: ["event", "planner", "management"],
    versions: ["1.0.0", "1.1.0"],
    minprice: 21,
    maxprice: 38,
    numberofsalescount: 300,
    impressions: 4000,
    rating: 4.4,
    reviewCount: 80,
    createdAt: "2023-10-05T15:00:00Z"
  }
];

export type TemplateBlock = {
  id: string;
  type: string;
  content: Record<string, any>;
  settings?: Record<string, any>;
  styles?: Record<string, any>;
};

export type Template = {
  name: string;
  blocks: TemplateBlock[];
};

export type TemplatePage = {
  Templates: Template[];
};

export type VersionInfo = {
  pricing: { type: string; price: number; description?: string }[];
  rating: number;
  starCounts: { [star: number]: number };
  reviewCount: number;
  createdAt: string;
  TemplatePages: Record<string, TemplatePage>;
};

export type WebsiteTemplatepagestype = {
  id: string;
  owner: string;
  name: string;
  description: string;
  media: string[];
  versions: Record<string, VersionInfo>;
};

export const websiteTemplatespagestype: Record<string, WebsiteTemplatepagestype> = {
  theme1: {
    id: "theme1",
    owner: "katir004",
    name: "E-commerce Store",
    description: "A very detailed description of the E-commerce Store theme. (500+ words...)\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam at augue non nibh tristique euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin nec ex nec urna dictum dictum. Mauris euismod, sapien nec laoreet cursus, enim erat dictum erat, nec dictum erat enim nec erat. Mauris euismod, sapien nec laoreet cursus, enim erat dictum erat, nec dictum erat enim nec erat.",
    media: [
      "https://example.com/theme1-1.jpg",
      "https://example.com/theme1-2.jpg",
      "https://example.com/theme1-demo.mp4"
    ],
    versions: {
      "1.1.1": {
        pricing: [
          { type: "Standard", price: 29 },
          { type: "Extended", price: 59 }
        ],
        rating: 4.5,
        starCounts: { 5: 120, 4: 30, 3: 10, 2: 2, 1: 1 },
        reviewCount: 163,
        createdAt: "2023-01-15T10:00:00Z",
        TemplatePages: {
          home: {
            Templates: [
              {
                name: "home1",
                blocks: [
                  {
                    id: "hero-section",
                    type: "hero",
                    content: {
                      heading: "Welcome to Our Store",
                      subheading: "Find the best products at the best prices",
                      buttonText: "Shop Now",
                      buttonUrl: "/products",
                      backgroundImage: "/assets/hero-bg.jpg"
                    },
                    settings: { fullHeight: true, textAlign: "center" },
                    styles: {}
                  }
                ]
              },
              {
                name: "home2",
                blocks: [
                  {
                    id: "hero-section2",
                    type: "hero",
                    content: {
                      heading: "Welcome to Our Store",
                      subheading: "Find the best products at the best prices",
                      buttonText: "Shop Now",
                      buttonUrl: "/products",
                      backgroundImage: "/assets/hero-bg.jpg"
                    },
                    settings: { fullHeight: true, textAlign: "center" },
                    styles: {}
                  }
                ]
              }
            ]
          },
          collection: {
            Templates: [
              {
                name: "collection1",
                blocks: [
                  {
                    id: "hero-section",
                    type: "hero",
                    content: {
                      heading: "Welcome to Our Store",
                      subheading: "Find the best products at the best prices",
                      buttonText: "Shop Now",
                      buttonUrl: "/products",
                      backgroundImage: "/assets/hero-bg.jpg"
                    },
                    settings: { fullHeight: true, textAlign: "center" },
                    styles: {}
                  }
                ]
              }
            ]
          }
        }
      },
      "1.1.2": {
        pricing: [
          { type: "Standard", price: 35 },
          { type: "Extended", price: 65 }
        ],
        rating: 4.6,
        starCounts: { 5: 140, 4: 40, 3: 12, 2: 1, 1: 0 },
        reviewCount: 193,
        createdAt: "2023-03-01T10:00:00Z",
        TemplatePages: {
          home: {
            Templates: [
              {
                name: "home1",
                blocks: [
                  {
                    id: "hero-section",
                    type: "hero",
                    content: {
                      heading: "Welcome to Our Store",
                      subheading: "Find the best products at the best prices",
                      buttonText: "Shop Now",
                      buttonUrl: "/products",
                      backgroundImage: "/assets/hero-bg.jpg"
                    },
                    settings: { fullHeight: true, textAlign: "center" },
                    styles: {}
                  }
                ]
              }
            ]
          }
        }
      }
    }
  },
  theme2: {
    id: "theme2",
    owner: "pr002",
    name: "Portfolio",
    description: "A very detailed description of the Portfolio theme. (500+ words...)\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.",
    media: [
      "https://example.com/portfolio-1.jpg",
      "https://example.com/portfolio-2.jpg"
    ],
    versions: {
      "1.1.1": {
        pricing: [
          { type: "Standard", price: 19 },
          { type: "Extended", price: 39 }
        ],
        rating: 4.3,
        starCounts: { 5: 80, 4: 20, 3: 5, 2: 1, 1: 0 },
        reviewCount: 106,
        createdAt: "2023-02-10T12:00:00Z",
        TemplatePages: {
          home: {
            Templates: [
              {
                name: "home1",
                blocks: [
                  {
                    id: "hero-section",
                    type: "hero",
                    content: {
                      heading: "Welcome to My Portfolio",
                      subheading: "Showcasing my creative work",
                      buttonText: "View Projects",
                      buttonUrl: "/projects",
                      backgroundImage: "/assets/portfolio-hero.jpg"
                    },
                    settings: { fullHeight: true, textAlign: "center" },
                    styles: {}
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
};

export type ThemeOwner = {
  id: string;
  name: string;
  dob: string;
  age: number;
  accountCreated: string;
  experience: string;
  themes: { id: string; name: string }[];
  followers: string[];
  following: string[];
  profileImage: string;
  bio: string;
  posts: { type: 'image' | 'video'; url: string }[];
};

export const themeOwners: Record<string, ThemeOwner> = {
  katir004: {
    id: "katir004",
    name: "Kati R.",
    dob: "1990-05-10",
    age: 34,
    accountCreated: "2018-03-15",
    experience: "5 years",
    themes: [
      { id: "theme1", name: "E-commerce Store" }
    ],
    followers: ["pr002", "alice01"],
    following: ["pr002"],
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Full-stack developer and theme designer.",
    posts: [
      { type: "image", url: "https://example.com/post1.jpg" },
      { type: "video", url: "https://example.com/post2.mp4" }
    ]
  },
  pr002: {
    id: "pr002",
    name: "Pranav P.",
    dob: "1988-11-22",
    age: 35,
    accountCreated: "2017-07-01",
    experience: "7 years",
    themes: [
      { id: "theme2", name: "Portfolio" }
    ],
    followers: ["katir004"],
    following: ["alice01"],
    profileImage: "https://randomuser.me/api/portraits/men/33.jpg",
    bio: "Portfolio and business theme specialist.",
    posts: [
      { type: "image", url: "https://example.com/portfolio-post1.jpg" }
    ]
  },
  alice01: {
    id: "alice01",
    name: "Alice W.",
    dob: "1995-02-18",
    age: 29,
    accountCreated: "2019-09-10",
    experience: "3 years",
    themes: [],
    followers: [],
    following: ["katir004"],
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "UI/UX designer and blogger.",
    posts: [
      { type: "image", url: "https://example.com/alice-post1.jpg" }
    ]
  }
};

export const myProfile: ThemeOwner = {
  id: "myuser",
  name: "Your Name",
  dob: "1992-01-01",
  age: 32,
  accountCreated: "2020-01-01",
  experience: "4 years",
  themes: [
    { id: "theme1", name: "E-commerce Store" },
    { id: "theme2", name: "Portfolio" }
  ],
  followers: ["katir004", "pr002"],
  following: ["alice01"],
  profileImage: "https://randomuser.me/api/portraits/men/99.jpg",
  bio: "This is my profile bio. I love building themes!",
  posts: [
    { type: "image", url: "https://example.com/my-post1.jpg" },
    { type: "video", url: "https://example.com/my-post2.mp4" }
  ]
}; 