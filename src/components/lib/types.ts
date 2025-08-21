/**
 * Core type definitions for the application
 */

// Site data types
export interface WebsiteData {
    id: string;
    name: string;
    Frontend: string;
    Backend: string;
    DB: string;
    description: string;
    logo?: string;
    favicon?: string;
    domain?: string;
    language: string;
    timezone: string;
    currency: string;
    theme: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    pages: Record<string, PageData>;
    products: Product[];
    links: Link[];
    analytics: WebsiteAnalytics;
    activeTemplate?: string;
    category?: string;
    thumbnail?: string;
    tags?: string[];
  }
  
  export interface WebsiteTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    pages: Record<string, PageData>;
  }
  
  export interface PageData {
    title: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    content?: PageContent;
    isPublished: boolean;
    isHomepage: boolean;
    createdAt: string;
    updatedAt: string;
    analytics?: PageAnalytics;
    children: Record<string, PageData>;
  }
  
  export interface PageAnalytics {
    views: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageTimeOnPage: number;
  }
  
  export interface WebsitePage {
    id: string;
    websiteId: string;
    title: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    content: PageContent;
    isPublished: boolean;
    isHomepage: boolean;
    createdAt: string;
    updatedAt: string;
    parentId?: string;
    children?: WebsitePage[];
  }
  
  export interface PageContent {
    layout: string;
    blocks: PageBlock[];
    UpdatedAt: string;
    styles?: Record<string, any>;
    scripts?: string[];
  }
  
  export interface PageBlock {
    id: string;
    type: string;
    content: any;
    settings: Record<string, any>;
    styles?: Record<string, any>;
    children?: PageBlock[];
    parentId?: string;
  }
  
  export interface Product {
    id: string;
    websiteId: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    salePrice?: number;
    currency: string;
    images: string[];
    categories: string[];
    tags: string[];
    inStock: boolean;
    variants?: ProductVariant[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductVariant {
    id: string;
    productId: string;
    name: string;
    sku: string;
    price: number | string;
    salePrice?: number | string;
    inStock: boolean;
    attributes: Record<string, any>;
  }
  
  export interface Link {
    id: string;
    websiteId: string;
    title: string;
    url: string;
    description?: string;
    image?: string;
    categories: string[];
    tags: string[];
    isExternal: boolean;
    openInNewTab: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface WebsiteAnalytics {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageSessionDuration: number;
    topPages: AnalyticsPageData[];
    traffic: TrafficSource[];
    devices: DeviceData[];
    conversionRate: number;
  }
  
  export interface AnalyticsPageData {
    pageId: string;
    title: string;
    views: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageTimeOnPage: number;
  }
  
  export interface TrafficSource {
    source: string;
    visitors: number;
    percentage: number;
  }
  
  export interface DeviceData {
    device: 'desktop' | 'tablet' | 'mobile';
    visitors: number;
    percentage: number;
  }
  
  // Email Campaign types
  export interface EmailCampaign {
    id: string;
    websiteId: string;
    name: string;
    subject: string;
    previewText?: string;
    templateId: string;
    content: EmailContent;
    status: 'draft' | 'scheduled' | 'sent' | 'archived';
    segmentId?: string;
    scheduledAt?: string;
    sentAt?: string;
    createdAt: string;
    updatedAt: string;
    stats?: EmailCampaignStats;
  }
  
  export interface EmailContent {
    blocks: EmailBlock[];
    styles?: Record<string, any>;
  }
  
  export interface EmailBlock {
    id: string;
    type: string;
    content: any;
    settings: Record<string, any>;
  }
  
  export interface EmailCampaignStats {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
  }
  
  export interface EmailSegment {
    id: string;
    websiteId: string;
    name: string;
    description?: string;
    rules: SegmentRule[];
    subscribersCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SegmentRule {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
    value: any;
  }
  
  // Plugin types
  export interface Plugin {
    id: string;
    name: string;
    description: string;
    version: string;
    thumbnail?: string;
    author: string;
    price: number | 'free';
    type: 'plugin' | 'component' | 'theme';
    capabilities: string[];
    settings: Record<string, any>;
    isActive: boolean;
    installedAt: string;
    updatedAt: string;
  }
  
  // User interface state
  export interface AppState {
    selectedWebsiteId: string | null;
    selectedFeature: string | null;
    selectedPagePath: string | null;
    selectedPlugin: string | null;
    selectedProduct: string | null;
    activeProfileTab: string | null;
    sidebarCollapsed: boolean;
    darkMode: boolean;
    isCustomizing: boolean;
    website: any | null;
    websites: any[];
  }
  
  // Media item type for unified media lists
  export interface MediaItem {
    type: 'image' | 'video' | 'gif';
    url: string;
  }
  
  