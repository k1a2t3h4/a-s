
/**
 * Initial application data and mock data
 */
import {type AppState, type Plugin } from './types';

export const mockPlugins: Plugin[] = [
  {
    id: "plugin1",
    name: "SEO Booster",
    description: "Enhance your website's search engine visibility",
    version: "1.2.0",
    thumbnail: "/assets/seo-plugin.jpg",
    author: "WebPixels",
    price: 19.99,
    type: "plugin",
    capabilities: ["analytics", "seo", "metadata"],
    settings: {
      autoGenerate: true,
      keywordsPerPage: 5
    },
    isActive: true,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "plugin2",
    name: "Contact Form Pro",
    description: "Advanced contact form with spam protection",
    version: "2.1.3",
    thumbnail: "/assets/form-plugin.jpg",
    author: "FormBuilders",
    price: "free",
    type: "component",
    capabilities: ["forms", "email"],
    settings: {
      captcha: true,
      autoResponder: false
    },
    isActive: true,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialAppState: AppState = {
  selectedWebsiteId: "website1",
  selectedFeature: "dashboard",
  selectedPagePath: null,
  selectedPlugin: null,
  selectedProduct: null,
  activeProfileTab: null,
  sidebarCollapsed: false,
  darkMode: false,
  isCustomizing: false,
  website: null,
  websites: []
};
