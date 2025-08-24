
/**
 * Website templates configuration
 */
import { WebsiteTemplate } from './types';

export const websiteTemplates: Record<string, WebsiteTemplate> = {
  "template1": {
    id: "template1",
    name: "E-commerce Store",
    description: "A complete e-commerce website with product pages, categories, and checkout flow",
    category: "e-commerce",
    thumbnail: "/assets/templates/ecommerce.jpg",
    tags: ["e-commerce", "shop", "products"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: {
      "/": {
        title: "Homepage",
        slug: "/",
        isPublished: true,
        isHomepage: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {
          layout: "default",
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
              settings: {
                fullHeight: true,
                textAlign: "center"
              },
              styles: {}
            }
          ],
          UpdatedAt: new Date().toISOString()
        },
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          averageTimeOnPage: 0
        },
        children: {
          "/products": {
            title: "Products",
            slug: "/products",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          },
          "/about": {
            title: "About Us",
            slug: "/about",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          }
        }
      }
    }
  },
  "template2": {
    id: "template2",
    name: "Portfolio",
    description: "A professional portfolio site for creative professionals",
    category: "portfolio",
    thumbnail: "/assets/templates/portfolio.jpg",
    tags: ["portfolio", "creative", "professional"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: {
      "/": {
        title: "Home",
        slug: "/",
        isPublished: true,
        isHomepage: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {
          layout: "default",
          blocks: [],
          UpdatedAt: new Date().toISOString()
        },
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          averageTimeOnPage: 0
        },
        children: {
          "/projects": {
            title: "Projects",
            slug: "/projects",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          },
          "/contact": {
            title: "Contact",
            slug: "/contact",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          }
        }
      }
    }
  },
  "template3": {
    id: "template3",
    name: "Blog",
    description: "A modern blog template with categories and tags",
    category: "blog",
    thumbnail: "/assets/templates/blog.jpg",
    tags: ["blog", "news", "content"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: {
      "/": {
        title: "Blog Home",
        slug: "/",
        isPublished: true,
        isHomepage: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {
          layout: "default",
          blocks: [],
          UpdatedAt: new Date().toISOString()
        },
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          averageTimeOnPage: 0
        },
        children: {
          "/articles": {
            title: "Articles",
            slug: "/articles",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          },
          "/categories": {
            title: "Categories",
            slug: "/categories",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          }
        }
      }
    }
  },
  "template4": {
    id: "template4",
    name: "Corporate Site",
    description: "A professional corporate website with services, team, and contact pages",
    category: "business",
    thumbnail: "/assets/templates/corporate.jpg",
    tags: ["business", "corporate", "company"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: {
      "/": {
        title: "Homepage",
        slug: "/",
        isPublished: true,
        isHomepage: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {
          layout: "default",
          blocks: [],
          UpdatedAt: new Date().toISOString()
        },
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          averageTimeOnPage: 0
        },
        children: {
          "/services": {
            title: "Services",
            slug: "/services",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          },
          "/team": {
            title: "Our Team",
            slug: "/team",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          },
          "/contact": {
            title: "Contact Us",
            slug: "/contact",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          }
        }
      }
    }
  },
  "template5": {
    id: "template5",
    name: "Landing Page",
    description: "A high-conversion landing page template for products or services",
    category: "marketing",
    thumbnail: "/assets/templates/landing.jpg",
    tags: ["landing", "conversion", "marketing"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: {
      "/": {
        title: "Landing Page",
        slug: "/",
        isPublished: true,
        isHomepage: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {
          layout: "default",
          blocks: [],
          UpdatedAt: new Date().toISOString()
        },
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          averageTimeOnPage: 0
        },
        children: {
          "/thank-you": {
            title: "Thank You",
            slug: "/thank-you",
            isPublished: true,
            isHomepage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {
              layout: "default",
              blocks: [],
              UpdatedAt: new Date().toISOString()
            },
            analytics: {
              views: 0,
              uniqueVisitors: 0,
              bounceRate: 0,
              averageTimeOnPage: 0
            },
            children: {}
          }
        }
      }
    }
  }
};
