import { useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import type { Product } from '../data/products'
import type { Lang } from '../App'

interface Props {
  product: Product
  lang: Lang
  onAddToCart: () => void
  onSelect: (product: Product) => void
}

export function ProductCard({ product, lang, onAddToCart, onSelect }: Props) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    onAddToCart()
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 skeu-surface"
      style={{
        backgroundColor: '#fff',
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(43,43,43,0.05), 0 14px 32px rgba(90,45,156,0.22)'
          : 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(43,43,43,0.05), 0 2px 8px rgba(90,45,156,0.10)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(product)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge === 'Oferta' && (
          <span className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E845A3' }}>
            {lang === 'es' ? 'Oferta' : 'Sale'}
          </span>
        )}
        {product.badge === 'Pieza Única' && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ color: '#E845A3', borderColor: '#E845A3', backgroundColor: 'rgba(232,69,163,0.08)' }}>
            {lang === 'es' ? 'Pieza Única' : 'One of a Kind'}
          </span>
        )}
        {product.bestseller && (
          <span className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#5A2D9C' }}>
            {lang === 'es' ? 'Bestseller' : 'Bestseller'}
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A2D9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: '#f0e8f8' }}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium mb-1" style={{ color: '#B384C8' }}>
          {product.category}
        </p>
        <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2" style={{ color: '#2B2B2B', minHeight: '2.6em' }}>
          {lang === 'es' ? product.name : product.nameEn}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold shrink-0" style={{ color: '#5A2D9C' }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-full text-white transition-all duration-200 shrink-0 whitespace-nowrap"
            style={{
              backgroundColor: added ? '#22c55e' : '#5A2D9C',
              transform: added ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {added
              ? '✓'
              : lang === 'es' ? '+ Carrito' : '+ Cart'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
