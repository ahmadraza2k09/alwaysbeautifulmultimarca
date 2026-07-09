import { ProductCard } from './ProductCard'
import { ImageWithFallback } from './ImageWithFallback'
import heroImage from '../imports/girl-image-dashbaord.jpg'
import { products, categories } from '../data/products'
import type { Lang } from '../App'
import type { Category, Product } from '../data/products'

interface Props {
  lang: Lang
  onShop: (cat?: Category) => void
  onAddToCart: () => void
  onSelectProduct: (product: Product) => void
}

const t = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en

export function TrustIcon({ name, size = 20 }: { name: 'pin' | 'truck' | 'chat' | 'sparkle'; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#5A2D9C',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'pin') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }
  if (name === 'truck') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </svg>
    )
  }
  if (name === 'chat') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v11H8l-4 4V4z" />
      </svg>
    )
  }
  return (
    <svg {...common} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l1.8 5.6L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.4L12 2z" />
    </svg>
  )
}

export function HomePage({ lang, onShop, onAddToCart, onSelectProduct }: Props) {
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#1a0a30' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t(lang, 'Siéntete', 'Feel')}
              <br />
              <em className="italic" style={{ color: '#E845A3' }}>
                {t(lang, 'hermosa.', 'beautiful.')}
              </em>
            </h1>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              {t(lang,
                'Fajas colombianas y ropa deportiva que moldean tu figura, elevan tu confianza y te acompañan en cada paso.',
                'Colombian shapewear and activewear that sculpt your figure, elevate your confidence, and move with you every step.'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onShop()}
                className="px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#E845A3' }}
              >
                {t(lang, 'Ver Colección', 'Shop Collection')}
              </button>
              <button
                onClick={() => onShop('Fajas')}
                className="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-all duration-200"
              >
                {t(lang, 'Explorar Fajas', 'Explore Shapewear')}
              </button>
            </div>
          </div>

          {/* Framed 1:1 image */}
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-8 rounded-full opacity-70 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(232,69,163,0.35) 0%, rgba(90,45,156,0.25) 45%, transparent 70%)',
                filter: 'blur(32px)',
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '1/1',
                boxShadow: '0 24px 60px rgba(90,45,156,0.45), 0 4px 14px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(232,69,163,0.35)',
              }}
            >
              <ImageWithFallback
                src={heroImage}
                alt="Always Beautiful"
                className="w-full h-full object-contain"
                style={{ backgroundColor: '#2B1245' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 35%), radial-gradient(ellipse at center, transparent 55%, rgba(26,10,48,0.55) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 hidden sm:flex justify-center pb-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-6 border-y" style={{ backgroundColor: '#5A2D9C', borderColor: '#4a2280' }}>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-16 sm:gap-y-4 text-white/80 text-sm font-medium">
          {(
            [
              { label: t(lang, 'Hecho en Colombia', 'Made in Colombia'), icon: 'pin' as const },
              { label: t(lang, 'Envíos a todo USA', 'Ships across USA'), icon: 'truck' as const },
              { label: t(lang, 'Atención por WhatsApp', 'WhatsApp Support'), icon: 'chat' as const },
              { label: t(lang, 'Calidad Premium', 'Premium Quality'), icon: 'sparkle' as const },
            ]
          ).map((f) => (
            <div key={f.label} className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span
                className="skeu-badge flex items-center justify-center rounded-full shrink-0"
                style={{ width: 44, height: 44, backgroundColor: '#F4F0FA' }}
              >
                <TrustIcon name={f.icon} />
              </span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
          >
            {t(lang, 'Nuestra Colección', 'Our Collection')}
          </h2>
          <p className="text-sm" style={{ color: '#B384C8' }}>
            {t(lang, 'Explora por categoría', 'Browse by category')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onShop(cat.key)}
              className="group relative rounded-2xl overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 skeu-surface"
              style={{ aspectRatio: '3/4' }}
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(90,45,156,0.85) 0%, transparent 60%)' }}
              >
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {lang === 'es' ? cat.label : cat.labelEn}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 px-4" style={{ backgroundColor: '#ede5f7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
              >
                {t(lang, 'Más Vendidos', 'Bestsellers')}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#B384C8' }}>
                {t(lang, 'Los favoritos de nuestra comunidad', 'Community favorites')}
              </p>
            </div>
            <button
              onClick={() => onShop()}
              className="text-sm font-semibold hidden sm:flex items-center gap-1 transition-colors hover:opacity-70"
              style={{ color: '#5A2D9C' }}
            >
              {t(lang, 'Ver todo', 'View all')} →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Split banner */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 min-h-[380px]">
          {/* Left */}
          <div
            className="flex flex-col justify-center p-10 sm:p-14"
            style={{ backgroundColor: '#5A2D9C' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#B384C8' }}>
              {t(lang, 'Nueva Colección', 'New Collection')}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t(lang, 'Fajas que moldean,\nno aprietan.', 'Shapewear that sculpts,\nnot squeezes.')}
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {t(lang,
                'Compresión médica de calidad colombiana, diseñada para recuperación post-op y uso diario.',
                'Medical-grade Colombian compression, designed for post-op recovery and everyday wear.'
              )}
            </p>
            <button
              onClick={() => onShop('Fajas')}
              className="self-start px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: '#E845A3', color: '#fff' }}
            >
              {t(lang, 'Explorar Fajas', 'Explore Shapewear')}
            </button>
          </div>
          {/* Right */}
          <div className="relative min-h-[260px]" style={{ backgroundColor: '#2B2B2B' }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&h=600&fit=crop&auto=format"
              alt="Shapewear collection"
              className="w-full h-full object-cover"
              style={{ minHeight: '260px' }}
            />
          </div>
        </div>
      </section>

      {/* Colombia callout */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #5A2D9C 0%, #3d1a6e 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t(lang, 'Orgullo Colombiano', 'Colombian Pride')}
          </h2>
          <p className="text-white/75 text-base mb-8 leading-relaxed">
            {t(lang,
              'Cada prenda está fabricada en Colombia con materiales de primera calidad. La tradición colombiana en fajas y ropa deportiva es reconocida mundialmente — y nosotros la traemos directo a ti en los Estados Unidos.',
              'Every garment is made in Colombia with premium materials. Colombian tradition in shapewear and activewear is world-renowned — and we bring it directly to you across the United States.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2"><span>✦</span><span>{t(lang, 'Materiales premium', 'Premium materials')}</span></div>
            <div className="flex items-center gap-2"><span>✦</span><span>{t(lang, 'Confección artesanal', 'Artisan craftsmanship')}</span></div>
            <div className="flex items-center gap-2"><span>✦</span><span>{t(lang, 'Tecnología de compresión', 'Compression technology')}</span></div>
          </div>
        </div>
      </section>

      {/* Contact / Social CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F4F0FA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
          >
            {t(lang, 'Contáctanos', 'Contact Us')}
          </h2>
          <p className="text-sm mb-8" style={{ color: '#B384C8' }}>
            {t(lang, '¿Preguntas? Estamos aquí para ayudarte.', 'Questions? We\'re here to help.')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/16504047700"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.854L.057 23.89l6.205-1.43A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.649-.522-5.154-1.431l-.369-.219-3.823.881.912-3.717-.239-.381A9.962 9.962 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp: +1 (650) 404-7700
            </a>
            <a
              href="https://www.instagram.com/alwaysbeautifulmultimarca/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @alwaysbeautifulmultimarca
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
