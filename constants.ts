import { BrandData, PartCategory, ProductItem, Translations } from './types';

// Helper to simulate product structure from the previous string lists
// In a real app, these URLs would point to your "uploads/" folder on your PHP server.
const createProduct = (name: string, index: number, category: string): ProductItem => {
  // DEMO IMAGES: Using placeholders related to trucks/parts based on category
  // In production, you will replace these with: `https://tudominio.com/uploads/${category}/${slug}.jpg`
  
  const demoImages = [
    `https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800`, // Truck detail
    `https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800`, // Chrome part
    `https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800`  // General truck
  ];

  // Logic to give some products multiple images for demonstration
  const images = index % 3 === 0 
    ? [demoImages[0], demoImages[1], demoImages[2]] // 3 images
    : index % 2 === 0 
      ? [demoImages[1], demoImages[2]] // 2 images
      : [demoImages[2]]; // 1 image

  return {
    id: `${category}-${index}`,
    name: name,
    description: `Accesorio de alta calidad para ${name}. Acabado premium en acero inoxidable.`,
    images: images
  };
};

export const BRANDS: Record<string, BrandData> = {
  kenworth: {
    id: 'kenworth',
    name: 'KENWORTH',
    logo: '🚛',
    color: '#C4161C',
    models: ['T800', 'T880', 'T680', 'Aerocab'],
    description: 'Kenworth es sinónimo de calidad y durabilidad en tractocamiones de clase mundial.'
  },
  international: {
    id: 'international',
    name: 'INTERNATIONAL',
    logo: '🚚',
    color: '#00529B',
    models: ['Eagle', 'Workstar', 'Prostar', 'Durastar', 'LT Series', 'HV Series', 'HX Series'],
    description: 'International ofrece soluciones versátiles para transporte pesado y trabajo intensivo.'
  },
  freightliner: {
    id: 'freightliner',
    name: 'FREIGHTLINER',
    logo: '🛻',
    color: '#004C97',
    models: ['Columbia', 'Cascadia 2012', 'Cascadia 2020', 'M2 106', 'M2 112'],
    description: 'Freightliner lidera la innovación en eficiencia y tecnología para tractocamiones.'
  },
  shacman: {
    id: 'shacman',
    name: 'SHACMAN',
    logo: '🚜',
    color: '#E31837',
    models: ['X3000', 'F3000', 'H3000'],
    description: 'Shacman ofrece potencia y resistencia para las condiciones más exigentes.'
  },
  scania: {
    id: 'scania',
    name: 'SCANIA',
    logo: '🦁',
    color: '#041E42',
    models: ['Serie R', 'Serie S', 'Serie G', 'Serie P'],
    description: 'Scania representa la excelencia sueca en ingeniería de transporte pesado.'
  },
  foton: {
    id: 'foton',
    name: 'FOTON',
    logo: '🔧',
    color: '#003DA5',
    models: ['Auman', 'EST', 'ETX'],
    description: 'Foton combina tecnología avanzada con excelente relación calidad-precio.'
  },
  sinotruk: {
    id: 'sinotruk',
    name: 'SINOTRUK',
    logo: '⚙️',
    color: '#D71921',
    models: ['Howo TX', 'Howo A7', 'Sitrak'],
    description: 'Sinotruk es líder en camiones pesados con tecnología robusta y confiable.'
  },
  hino: {
    id: 'hino',
    name: 'HINO',
    logo: '🔴',
    color: '#E60012',
    models: ['Hino 300', 'Hino 500', 'Hino 700'],
    description: 'Hino ofrece la confiabilidad japonesa en transporte de carga mediana y pesada.'
  },
  mack: {
    id: 'mack',
    name: 'MACK',
    logo: '🐕',
    color: '#FFB81C',
    models: ['Anthem', 'Pinnacle', 'Granite', 'LR'],
    description: 'Mack Trucks, construidos como un Mack, sinónimo de potencia y durabilidad.'
  },
  chevrolet: {
    id: 'chevrolet',
    name: 'CHEVROLET',
    logo: '➕',
    color: '#D4AF37',
    models: ['Silverado', 'FTR', 'NQR', 'NPR'],
    description: 'Chevrolet ofrece versatilidad y confianza en vehículos comerciales.'
  },
  mercedesbenz: {
    id: 'mercedesbenz',
    name: 'MERCEDES-BENZ',
    logo: '⭐',
    color: '#00ADEF',
    models: ['Actros', 'Arocs', 'Atego', 'Axor'],
    description: 'Mercedes-Benz define el lujo y la tecnología premium en transporte pesado.'
  }
};

// Raw lists converted to Product objects
const rawBompers = [
  'Bomper tipo ranchero', 'Bomper tipo sesgado', 'Centro de bomper', 'Mallas exploradoras', 
  'Porta placas alto relieve', 'Guías', 'Spoiler', 'Soportes para exploradoras', 
  'Platinas guía bumper', 'Pepinos', 'Cucuyos ovalados', 'Extensiones laterales de bumper'
];

const rawCapo = [
  'Deflector de insectos (matamosquitos)', 'Persianas', 'Tubo de la bisagra', 'Deflectores de las unidades', 
  'Eles de las unidades', 'Emblema del capó', 'Refuerzos del capó', 'Guardabarros', 'Poseel del capó', 'Módulo del motor'
];

const rawCabina = [
  'Cornetas', 'Boceles de los relojes', 'Soporte para licuadoras', 'Licuadoras', 'Mallas de los exostos', 
  'Deflectores de ventana', 'Descansa brazos', 'Chapas de las puertas', 'Bocel chapas Gran General', 
  'Soportes, regletas y espejos', 'Porta placa bajo puerta', 'Lámina bajo puerta', 'Marco cromado de ventanilla', 
  'Seguro de ventanilla copiloto', 'Extensión de guardabarros', 'Mallas de los filtros', 'Portacocuyos delantero de filtros', 
  'Portacocuyos trasero de filtros', 'Seguros de los filtros', 'Seguro posterior', 'Soporte de alerón', 
  'Portacocuyos del alerón', 'Portacocuyos bajo puerta', 'Antenas', 'Soportes para antenas', 'Resortes para antenas', 
  'Porta placas pequeño', 'Seguro de los espejos', 'Portacocuyos bajo espejos (tortugas)', 'Escuadra para caja de herramientas', 
  'Rejilla de entrada de aire lateral del capó', 'Tapa de batería', 'Ovispos'
];

const rawEstribos = [
  'Estribo de tanque', 'Estribo intermedio de tanque', 'Estribo inferior de tanque', 'Estribo de caja de herramientas', 
  'Estribo primer paso', 'Alargue de estribo intermedio de tanque', 'Alargue de estribo inferior de tanque', 
  'Alargue de estribo primer paso', 'Alargue de estribo de caja de herramientas', 'Forro de urea con estribo', 'Protector de catalizador'
];

const rawChasis = [
  'Parrilla de chasis', 'Guardapolvos delantero', 'Guardapolvos trasero y osculizable', 'Pesas de los cauchos', 
  'Cauchos de los osculizables', 'Forro de chasis', 'Porta placas posterior grande', 'Guarda grasas', 
  'Soportes de pintor', 'Porta placas posterior mediano', 'Portacocuyos detrás de la cabina'
];

export const CATEGORIES_ES: PartCategory[] = [
  { 
    name: 'BOMPERS', 
    iconName: 'Shield', 
    emoji: '💥',
    description: 'Accesorios relacionados con el parachoques delantero',
    items: rawBompers.map((name, i) => createProduct(name, i, 'bompers'))
  },
  { 
    name: 'CAPÓ', 
    iconName: 'Truck', 
    emoji: '🚀',
    description: 'Accesorios y componentes del capó',
    items: rawCapo.map((name, i) => createProduct(name, i, 'capo'))
  },
  { 
    name: 'CABINA', 
    iconName: 'Crown', 
    emoji: '👑',
    description: 'Accesorios externos e internos de la cabina',
    items: rawCabina.map((name, i) => createProduct(name, i, 'cabina'))
  },
  { 
    name: 'ESTRIBOS Y ALARGUES', 
    iconName: 'Layers', 
    emoji: '⚡',
    description: 'Accesorios de acceso y protección lateral',
    items: rawEstribos.map((name, i) => createProduct(name, i, 'estribos'))
  },
  { 
    name: 'CHASIS', 
    iconName: 'Settings', 
    emoji: '🔧',
    description: 'Accesorios del chasis y protección',
    items: rawChasis.map((name, i) => createProduct(name, i, 'chasis'))
  }
];

// For English, we do the same mapping logic (simplified for this update)
// In a real app, you would have separate text translations.
export const CATEGORIES_EN: PartCategory[] = CATEGORIES_ES.map(cat => ({
  ...cat,
  name: cat.name === 'BOMPERS' ? 'BUMPERS' : 
        cat.name === 'CAPÓ' ? 'HOOD' : 
        cat.name === 'CABINA' ? 'CABIN' : 
        cat.name === 'ESTRIBOS Y ALARGUES' ? 'STEPS & EXTENSIONS' : 'CHASSIS',
  items: cat.items.map(item => ({...item, description: 'High quality accessory. Stainless steel finish.'}))
}));

export const TRANSLATIONS: Record<'es' | 'en', Translations> = {
  es: {
    slogan: 'Líder en Lujos de camiones',
    mainTitle1: 'Potencia y',
    mainTitle2: 'Calidad',
    mainTitle3: 'Garantizado',
    heroDescription: 'Accesorios de lujo premium para tractocamiones. Transformamos tu cabina en un espacio de confort y estilo con los mejores productos del mercado.',
    btnCatalog: 'Ver Catálogo de Lujos',
    btnQuote: 'Cotizar Accesorios',
    catalogTitle: 'CATÁLOGO DE TRACTOCAMIONES',
    catalogSubtitle: 'Seleccione una marca para ver los modelos disponibles',
    brandsTitle: 'MARCAS DISPONIBLES',
    modelsTitle: 'MODELOS',
    accessoriesTitle: 'ACCESORIOS Y LUJOS DISPONIBLES',
    backButton: 'Volver a Marcas',
    servicesTitle: 'NUESTROS SERVICIOS',
    servicesSubtitle: 'Soluciones completas para tu tractocamión',
    service1Title: 'Repuestos Originales',
    service1Desc: 'Piezas certificadas para todas las marcas',
    service2Title: 'Accesorios de Lujo',
    service2Desc: 'Personaliza tu camión con estilo premium',
    service3Title: 'Garantía Completa',
    service3Desc: 'Respaldo total en productos y servicios',
    service4Title: 'Envío Nacional',
    service4Desc: 'Entregamos en todo Colombia',
    contactTitle: 'CONTÁCTANOS',
    contactSubtitle: '¿Listo para equipar tu tractocamión? Cotiza ahora',
    locations: 'UBICACIONES',
    phones: 'TELÉFONOS',
    email: 'CORREO',
    navHome: 'Inicio',
    navCatalog: 'Catálogo',
    navServices: 'Servicios',
    navContact: 'Contactar',
    tag1: '✓ Accesorios Premium',
    tag2: '✓ Accesorios en Acero Inoxidable',
    tag3: '✓ Envío Nacional',
    footerCopyright: '© 2024 Tractolujos Tamayo - Todos los derechos reservados'
  },
  en: {
    slogan: 'Leader in Truck Luxury Accessories',
    mainTitle1: 'Power and',
    mainTitle2: 'Quality',
    mainTitle3: 'Guaranteed',
    heroDescription: 'Premium luxury accessories for semi-trucks. We transform your cabin into a space of comfort and style with the best products on the market.',
    btnCatalog: 'View Luxury Catalog',
    btnQuote: 'Get Quote',
    catalogTitle: 'SEMI-TRUCK CATALOG',
    catalogSubtitle: 'Select a brand to view available models',
    brandsTitle: 'AVAILABLE BRANDS',
    modelsTitle: 'MODELS',
    accessoriesTitle: 'ACCESSORIES & LUXURY ITEMS',
    backButton: 'Back to Brands',
    servicesTitle: 'OUR SERVICES',
    servicesSubtitle: 'Complete solutions for your semi-truck',
    service1Title: 'Original Parts',
    service1Desc: 'Certified parts for all brands',
    service2Title: 'Luxury Accessories',
    service2Desc: 'Customize your truck with premium style',
    service3Title: 'Full Warranty',
    service3Desc: 'Total backing on products and services',
    service4Title: 'National Shipping',
    service4Desc: 'We deliver throughout Colombia',
    contactTitle: 'CONTACT US',
    contactSubtitle: 'Ready to upgrade? Get a quote now',
    locations: 'LOCATIONS',
    phones: 'PHONES',
    email: 'EMAIL',
    navHome: 'Home',
    navCatalog: 'Catalog',
    navServices: 'Services',
    navContact: 'Contact',
    tag1: '✓ Premium Accessories',
    tag2: '✓ Stainless Steel Accessories',
    tag3: '✓ National Shipping',
    footerCopyright: '© 2026 Tractolujos Tamayo - All rights reserved'
  }
};