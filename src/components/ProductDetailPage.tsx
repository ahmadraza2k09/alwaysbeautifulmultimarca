import { useEffect, useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import { TrustIcon } from './HomePage'
import type { Category, Product } from '../data/products'
import type { Lang } from '../App'

interface Props {
  product: Product
  lang: Lang
  onAddToCart: (qty?: number) => void
  onNavHome: () => void
  onNavCategory: (cat: Category) => void
}

export function ProductDetailPage({ product, lang, onAddToCart, onNavHome, onNavCategory }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const t = (es: string, en: string) => (lang === 'es' ? es : en)
  const productName = lang === 'es' ? product.name : product.nameEn
  const description = lang === 'es' ? product.description : product.descriptionEn
  const isOferta = product.badge === 'Oferta'
  const originalPrice = isOferta ? Math.ceil(product.price / 0.8) : null

  useEffect(() => {
    if (!zoomOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  const total = (product.price * quantity).toFixed(2)
  const waMessage = encodeURIComponent(
    t(
      `Hola! Quiero comprar: ${productName} — Cantidad: ${quantity} — $${total}`,
      `Hi! I'd like to buy: ${productName} — Qty: ${quantity} — $${total}`
    )
  )
  const buyNowHref = `https://wa.me/16504047700?text=${waMessage}`

  const trustItems: { label: string; icon: 'pin' | 'truck' | 'chat' | 'sparkle' }[] = [
    { label: t('Hecho en Colombia', 'Made in Colombia'), icon: 'pin' },
    { label: t('Envíos a todo USA', 'Ships across USA'), icon: 'truck' },
    { label: t('Soporte WhatsApp', 'WhatsApp Support'), icon: 'chat' },
    { label: t('Calidad Premium', 'Premium Quality'), icon: 'sparkle' },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-1 flex-wrap" style={{ color: '#B384C8' }}>
        <button onClick={onNavHome} className="hover:underline">
          {t('Inicio', 'Home')}
        </button>
        <span>/</span>
        <button onClick={() => onNavCategory(product.category)} className="hover:underline">
          {product.category}
        </button>
        <span>/</span>
        <span style={{ color: '#5A2D9C' }}>{productName}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden skeu-surface" style={{ aspectRatio: '4/5', backgroundColor: '#f0e8f8' }}>
          <ImageWithFallback src={product.image} alt={productName} className="w-full h-full object-cover" />
          <button
            onClick={() => setZoomOpen(true)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            aria-label={t('Ampliar imagen', 'Zoom image')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A2D9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: '#B384C8' }}>
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
            {productName}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="skeu-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#F4F0FA', color: '#5A2D9C' }}
            >
              <TrustIcon name="pin" size={14} /> {t('Hecho en Colombia', 'Made in Colombia')}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}
            >
              ● {t('Disponible', 'Available')}
            </span>
          </div>

          {description && (
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#2B2B2B' }}>
              {description}
            </p>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            {isOferta && originalPrice !== null ? (
              <>
                <span className="text-3xl font-bold" style={{ color: '#E845A3' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg line-through" style={{ color: '#B384C8' }}>
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#E845A3' }}>
                  {t('Ahorra 20%', 'Save 20%')}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold" style={{ color: '#5A2D9C' }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium" style={{ color: '#2B2B2B' }}>
              {t('Cantidad', 'Quantity')}
            </span>
            <div className="flex items-center rounded-full overflow-hidden border" style={{ borderColor: '#B384C8' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-lg"
                style={{ color: '#5A2D9C' }}
                aria-label={t('Disminuir', 'Decrease')}
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold" style={{ color: '#2B2B2B' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-lg"
                style={{ color: '#5A2D9C' }}
                aria-label={t('Aumentar', 'Increase')}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => onAddToCart(quantity)}
              className="flex-1 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#5A2D9C' }}
            >
              {t('Añadir al Carrito', 'Add to Cart')}
            </button>
            <a
              href={buyNowHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              {t('Comprar por WhatsApp', 'Buy Now via WhatsApp')}
            </a>
            <button
              onClick={() => setWishlisted((w) => !w)}
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors shrink-0"
              style={{ borderColor: '#B384C8', backgroundColor: wishlisted ? 'rgba(232,69,163,0.1)' : 'transparent' }}
              aria-label={t('Lista de deseos', 'Wishlist')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlisted ? '#E845A3' : 'none'}
                stroke="#E845A3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: '#e9e0f5' }}>
            {trustItems.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center gap-2">
                <span
                  className="skeu-badge flex items-center justify-center rounded-full"
                  style={{ width: 36, height: 36, backgroundColor: '#F4F0FA' }}
                >
                  <TrustIcon name={f.icon} size={16} />
                </span>
                <span className="text-[11px] font-medium" style={{ color: '#2B2B2B' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(26,10,48,0.9)' }}
          onClick={() => setZoomOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setZoomOpen(false)}
            aria-label={t('Cerrar', 'Close')}
          >
            ✕
          </button>
          <img
            src={product.image}
            alt={productName}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
