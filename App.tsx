import React, { useState, useEffect } from 'react';
import { Truck, Phone, MapPin, Mail, Menu, X, ArrowLeft, Wrench, Shield, Crown, Layers, Settings, MessageCircle, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { BRANDS, CATEGORIES_ES, CATEGORIES_EN, TRANSLATIONS } from './constants';
import { TruckIllustration } from './components/TruckIllustration';
import { BrandData, Language, ProductItem } from './types';

// --- Icons Map for Dynamic Rendering ---
const IconsMap: Record<string, React.FC<any>> = {
  Shield: Shield,
  Truck: Truck,
  Crown: Crown,
  Layers: Layers,
  Settings: Settings
};

// Extracted Component: WhatsApp Button (Static)
const WhatsAppButton = () => (
  <a
    href="https://wa.me/573125194078?text=Hola,%20quiero%20cotizar%20accesorios"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 group"
    aria-label="Chat WhatsApp"
  >
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
      <MessageCircle className="w-8 h-8 text-white" fill="white" />
    </div>
    <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-emerald-800 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
      Chat en vivo
    </div>
  </a>
);

// --- Gallery Modal Component ---
const GalleryModal = ({ product, onClose }: { product: ProductItem; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const hasMultiple = product.images.length > 1;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation - Left */}
      {hasMultiple && (
        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-5xl w-full flex flex-col items-center gap-4">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[70vh] rounded-lg overflow-hidden bg-neutral-900 shadow-2xl border border-white/10">
          <img 
            src={product.images[currentIndex]} 
            alt={`${product.name} view ${currentIndex + 1}`} 
            className="w-full h-full object-contain"
          />
          
          {/* Mobile Nav Overlay */}
          {hasMultiple && (
            <div className="absolute inset-0 flex items-center justify-between p-2 md:hidden pointer-events-none">
              <button onClick={prevImage} className="pointer-events-auto p-2 bg-black/50 rounded-full text-white backdrop-blur-sm"><ChevronLeft /></button>
              <button onClick={nextImage} className="pointer-events-auto p-2 bg-black/50 rounded-full text-white backdrop-blur-sm"><ChevronRight /></button>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {hasMultiple && (
          <div className="flex gap-2 overflow-x-auto max-w-full p-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  currentIndex === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="text-center">
          <h3 className="font-display text-2xl text-white tracking-wide">{product.name}</h3>
          <p className="text-neutral-400 text-sm mt-1">{product.description}</p>
          <a
             href={`https://wa.me/573125194078?text=Me interesa el accesorio: ${product.name}`}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Navigation - Right */}
      {hasMultiple && (
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-all hidden md:block">
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Catalog State
  const [view, setView] = useState<'brands' | 'models' | 'detail'>('brands');
  const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const t = TRANSLATIONS[lang];
  const categories = lang === 'es' ? CATEGORIES_ES : CATEGORIES_EN;

  // Language Detection
  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code === 'US' || data.country_code === 'GB') {
          setLang('en');
        }
      } catch (e) {
        // Fallback to Spanish silently
      }
    };
    detect();
  }, []);

  // Automatic Scroll Effect when View Changes
  useEffect(() => {
    if (view === 'models' || view === 'detail') {
      const el = document.getElementById('catalog-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [view]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleBrandSelect = (brand: BrandData) => {
    setSelectedBrand(brand);
    setView('models');
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setView('detail');
  };

  const handleBack = () => {
    if (view === 'detail') setView('models');
    else if (view === 'models') {
        setView('brands');
        setSelectedBrand(null);
    }
  };

  return (
    <div className="min-h-full bg-neutral-950 text-white selection:bg-orange-500 selection:text-white">
      
      {/* Gallery Modal */}
      {selectedProduct && (
        <GalleryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* --- Navbar --- */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/10 bg-neutral-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Truck className="w-10 h-10 text-orange-500" />
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-wider title-glow">TRACTOLUJOS</span>
                <span className="text-xs font-bold tracking-[0.3em] text-orange-500 -mt-1">TAMAYO</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: t.navHome, id: 'hero' },
                { label: t.navCatalog, id: 'catalog' },
                { label: t.navServices, id: 'services' },
                { label: t.navContact, id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-orange-500 transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))}
              
              <button 
                onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
                className="px-3 py-1 rounded border border-white/20 text-xs font-bold hover:bg-white/10 transition"
              >
                {lang.toUpperCase()}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-white/10">
             <div className="px-4 pt-2 pb-6 space-y-2">
              {[
                { label: t.navHome, id: 'hero' },
                { label: t.navCatalog, id: 'catalog' },
                { label: t.navServices, id: 'services' },
                { label: t.navContact, id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-4 text-base font-medium border-b border-white/5 hover:text-orange-500"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="h-20" /> {/* Spacer */}

      {/* --- Hero Section --- */}
      <section id="hero" className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm">
                <Truck className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold tracking-widest uppercase text-orange-400">{t.slogan}</span>
              </div>
              
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9]">
                {t.mainTitle1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 title-glow">{t.mainTitle2}</span> <br />
                {t.mainTitle3}
              </h1>
              
              <p className="text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t.heroDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-600/30 transition-all hover:-translate-y-1"
                >
                  {t.btnCatalog}
                </button>
                <a 
                  href="https://wa.me/573125194078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/5 transition-all"
                >
                  {t.btnQuote}
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block relative">
               <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <TruckIllustration color="#FF6B00" brandName="TAMAYO" modelName="PREMIUM" />
               </div>
               {/* Decorative floating elements */}
               <div className="absolute -top-10 -left-10 w-24 h-24 border-2 border-orange-500/20 rounded-xl rotate-12 animate-pulse"></div>
               <div className="absolute -bottom-5 right-10 w-32 h-32 border-2 border-red-500/20 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Catalog Section --- */}
      <section id="catalog" className="py-24 bg-neutral-900/50 relative border-t border-white/5">
        <div id="catalog-anchor" className="absolute -top-24"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">{t.catalogTitle}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-transparent mx-auto"></div>
            <p className="text-neutral-400 mt-4">{view === 'brands' ? t.catalogSubtitle : view === 'models' ? t.modelsTitle : t.accessoriesTitle}</p>
          </div>

          {/* Navigation Checkpoint */}
          {view !== 'brands' && (
            <button 
              onClick={handleBack}
              className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
            >
              <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm uppercase tracking-wide">{t.backButton}</span>
            </button>
          )}

          {/* VIEW 1: BRANDS GRID */}
          {view === 'brands' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {Object.values(BRANDS).map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand)}
                  className="group relative bg-neutral-800/50 border border-white/5 hover:border-orange-500/50 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{brand.logo}</div>
                  <span className="font-bold text-sm tracking-wider">{brand.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                </button>
              ))}
            </div>
          )}

          {/* VIEW 2: MODELS GRID */}
          {view === 'models' && selectedBrand && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8 p-4 bg-orange-900/20 border border-orange-500/20 rounded-xl">
                 <span className="text-4xl">{selectedBrand.logo}</span>
                 <div>
                    <h3 className="font-bold text-xl">{selectedBrand.name}</h3>
                    <p className="text-sm text-neutral-400">{selectedBrand.description}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedBrand.models.map((model) => (
                  <button
                    key={model}
                    onClick={() => handleModelSelect(model)}
                    className="bg-neutral-800 hover:bg-gradient-to-br hover:from-orange-600 hover:to-red-600 p-6 rounded-xl text-center font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: DETAIL (PRODUCTS GRID) */}
          {view === 'detail' && selectedBrand && selectedModel && (
            <div className="animate-fade-in space-y-12">
              
              {/* Truck Header Card */}
              <div className="bg-neutral-800/50 border border-white/10 rounded-3xl p-6 lg:p-8 overflow-hidden relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                   {/* Left: Illustration */}
                   <div className="relative group">
                      <TruckIllustration 
                        color={selectedBrand.color} 
                        brandName={selectedBrand.name} 
                        modelName={selectedModel} 
                      />
                   </div>

                   {/* Right: Info */}
                   <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-orange-500 rounded-full text-xs font-bold text-black uppercase">Stock Disponible</span>
                      </div>
                      <h2 className="font-display text-5xl mb-4">{selectedBrand.name} <span className="text-neutral-500">{selectedModel}</span></h2>
                      <p className="text-neutral-300 mb-8 leading-relaxed">
                        Equipa tu {selectedModel} con los mejores accesorios del mercado. Garantía certificada y acabados de lujo para destacar en la carretera.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {[t.tag1, t.tag2, t.tag3].map((tag, idx) => (
                          <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-orange-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Parts Categories Section */}
              <div className="space-y-16">
                 {categories.map((cat, idx) => {
                   const Icon = IconsMap[cat.iconName] || Settings;
                   return (
                     <div key={idx} className="relative">
                        {/* Category Header */}
                        <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
                           <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                              <Icon className="w-8 h-8" />
                           </div>
                           <div>
                              <h3 className="font-display text-3xl tracking-wide">{cat.name}</h3>
                              <p className="text-sm text-neutral-400">{cat.description}</p>
                           </div>
                        </div>
                        
                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                           {cat.items.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="group bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10 text-left flex flex-col"
                              >
                                 {/* Image Area */}
                                 <div className="aspect-square w-full relative bg-neutral-800 overflow-hidden">
                                    <img 
                                      src={product.images[0]} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                      loading="lazy"
                                    />
                                    {/* Multiple Images Indicator */}
                                    {product.images.length > 1 && (
                                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                        <ImageIcon className="w-3 h-3" />
                                        {product.images.length}
                                      </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                                       <div className="bg-orange-500 text-white p-2 rounded-full transform scale-50 group-hover:scale-100 transition-transform">
                                          <ZoomIn className="w-6 h-6" />
                                       </div>
                                    </div>
                                 </div>
                                 
                                 {/* Content Area */}
                                 <div className="p-4 flex flex-col flex-grow">
                                    <h4 className="font-bold text-sm leading-tight mb-2 line-clamp-2 text-neutral-200 group-hover:text-white">{product.name}</h4>
                                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/5">
                                      <span className="text-xs text-green-400 font-medium">Disponible</span>
                                      <span className="text-xs text-neutral-500 group-hover:text-orange-400 transition-colors">Ver Detalles</span>
                                    </div>
                                 </div>
                              </button>
                           ))}
                        </div>
                     </div>
                   );
                 })}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 px-4 bg-neutral-900">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl mb-4">{t.servicesTitle}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-transparent mx-auto"></div>
              <p className="text-neutral-400 mt-4">{t.servicesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { icon: Wrench, title: t.service1Title, desc: t.service1Desc },
                 { icon: Crown, title: t.service2Title, desc: t.service2Desc },
                 { icon: Shield, title: t.service3Title, desc: t.service3Desc },
                 { icon: MapPin, title: t.service4Title, desc: t.service4Desc },
               ].map((service, idx) => (
                 <div key={idx} className="p-8 rounded-3xl bg-neutral-800/50 border border-white/5 hover:border-orange-500 text-center transition-all group hover:-translate-y-2">
                    <div className="inline-flex p-4 rounded-2xl bg-neutral-900 text-orange-500 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                       <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl mb-3 tracking-wide">{service.title}</h3>
                    <p className="text-sm text-neutral-400">{service.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 px-4 bg-black relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl mb-4">{t.contactTitle}</h2>
              <p className="text-neutral-400">{t.contactSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Locations */}
               <div className="bg-neutral-900 p-8 rounded-2xl border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-6 text-orange-500">
                     <MapPin className="w-6 h-6" />
                     <h3 className="font-display text-2xl">{t.locations}</h3>
                  </div>
                  <div className="space-y-6 text-sm">
                     <div>
                        <strong className="block text-white mb-1 text-base">Boyacá</strong>
                        <p className="text-neutral-400">Ciudadela Industrial Manzana D, Bodega 6</p>
                        <p className="text-neutral-400">Carrera 42 #14-66, Duitama</p>
                     </div>
                     <div>
                        <strong className="block text-white mb-1 text-base">Casanare</strong>
                        <p className="text-neutral-400">Carrera 5 #36-50, Yopal</p>
                     </div>
                  </div>
               </div>

               {/* Phones */}
               <div className="bg-neutral-900 p-8 rounded-2xl border-l-4 border-red-600">
                  <div className="flex items-center gap-3 mb-6 text-red-600">
                     <Phone className="w-6 h-6" />
                     <h3 className="font-display text-2xl">{t.phones}</h3>
                  </div>
                  <div className="space-y-4">
                     <a href="tel:+573125194078" className="block text-lg font-bold hover:text-orange-500 transition-colors">+57 312-519-4078</a>
                     <a href="tel:+573143896293" className="block text-lg font-bold hover:text-orange-500 transition-colors">+57 314-389-6293</a>
                  </div>
               </div>

               {/* Email */}
               <div className="bg-neutral-900 p-8 rounded-2xl border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-6 text-orange-500">
                     <Mail className="w-6 h-6" />
                     <h3 className="font-display text-2xl">{t.email}</h3>
                  </div>
                  <a href="mailto:tractotamayo@gmail.com" className="text-lg hover:text-orange-500 transition-colors">tractotamayo@gmail.com</a>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 bg-neutral-950 border-t border-white/10 text-center text-neutral-500 text-sm">
         <div className="max-w-7xl mx-auto px-4">
            <p className="mb-2">{t.footerCopyright}</p>
            <div className="flex justify-center gap-4 mt-4">
               <Truck className="w-4 h-4" />
               <span>TRACTOLUJOS TAMAYO</span>
            </div>
         </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default App;