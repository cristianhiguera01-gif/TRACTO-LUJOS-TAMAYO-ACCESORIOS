export type Language = 'es' | 'en';

export interface BrandData {
  id: string;
  name: string;
  logo: string; // Emoji or char representation
  color: string;
  models: string[];
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description?: string;
  images: string[]; // Array of URLs
  price?: string;
}

export interface PartCategory {
  name: string;
  iconName: string; // Mapping to Lucide icons
  emoji: string;
  description: string;
  items: ProductItem[];
}

export interface Translations {
  slogan: string;
  mainTitle1: string;
  mainTitle2: string;
  mainTitle3: string;
  heroDescription: string;
  btnCatalog: string;
  btnQuote: string;
  catalogTitle: string;
  catalogSubtitle: string;
  brandsTitle: string;
  modelsTitle: string;
  accessoriesTitle: string;
  backButton: string;
  servicesTitle: string;
  servicesSubtitle: string;
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service4Title: string;
  service4Desc: string;
  contactTitle: string;
  contactSubtitle: string;
  locations: string;
  phones: string;
  email: string;
  navHome: string;
  navCatalog: string;
  navServices: string;
  navContact: string;
  tag1: string;
  tag2: string;
  tag3: string;
  footerCopyright: string;
}