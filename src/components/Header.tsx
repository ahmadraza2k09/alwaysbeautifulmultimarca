import { useState } from 'react'
import logoSrc from '../imports/cf2cb152-86cd-4195-a7b5-9bdfb72589f4.png'
import type { Page, Lang } from '../App'
import type { Category } from '../data/products'

const navItems: { label: string; labelEn: string; cat?: Category }[] = [
  { label: 'Inicio', labelEn: 'Home' },
  { label: 'Fajas', labelEn: 'Shapewear', cat: 'Fajas' },
  { label: 'Leggings', labelEn: 'Leggings', cat: 'Leggings' },
  { label: 'Conjuntos', labelEn: 'Sets', cat: 'Conjuntos' },
  { label: 'Ropa Deportiva', labelEn: 'Activewear', cat: 'Tops Deportivos' },
  { label: 'Ofertas', labelEn: 'Sale' },
]

interface Props {
  lang: Lang
  setLang: (l: Lang) => void
  onNav: (p: Page) => void
  onShopCategory: (cat?: Category) => void
  cartCount: number
  currentPage: Page
}

export function Header({ lang, setLang, onNav, onShopCategory, cartCount }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = (es: string, en: string) => lang === 'es' ? es : en

  return (
    <>
      {/* Announcement marquee */}
      <div
        className="text-white text-xs font-medium py-2 overflow-hidden"
        style={{ backgroundColor: '#E845A3' }}
      >
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0" aria-hidden={rep === 1}>
              {[t('Hecho en Colombia', 'Made in Colombia'), t('Envíos a toda USA', 'Shipping across USA'), 'WhatsApp'].map(
                (item, i) => (
                  <span key={i} className="px-6 whitespace-nowrap">
                    {item}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 skeu-surface-dark"
        style={{ backgroundColor: '#5A2D9C' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNav('home')} className="flex items-center gap-2 shrink-0">
            <img
              src={logoSrc}
              alt="Always Beautiful"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span
              className="text-white font-semibold text-lg hidden sm:block"
              style={{ letterSpacing: '0.02em' }}
            >
              Always Beautiful
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.cat ? onShopCategory(item.cat) : item.label === 'Inicio' || item.labelEn === 'Home' ? onNav('home') : onShopCategory()}
                className="text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-white/10"
              >
                {t(item.label, item.labelEn)}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="hidden sm:flex items-center rounded-full overflow-hidden border border-white/30 text-xs font-semibold">
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1 transition-colors ${lang === 'es' ? 'bg-white text-purple-800' : 'text-white hover:bg-white/10'}`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 transition-colors ${lang === 'en' ? 'bg-white text-purple-800' : 'text-white hover:bg-white/10'}`}
              >
                EN
              </button>
            </div>

            {/* Cart */}
            <button className="relative text-white p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ backgroundColor: '#E845A3' }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/20" style={{ backgroundColor: '#5A2D9C' }}>
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileOpen(false)
                    item.cat ? onShopCategory(item.cat) : item.label === 'Inicio' ? onNav('home') : onShopCategory()
                  }}
                  className="block w-full text-left text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  {t(item.label, item.labelEn)}
                </button>
              ))}
              {/* Language in mobile */}
              <div className="flex gap-2 pt-2 px-3">
                <button onClick={() => setLang('es')} className={`text-xs font-semibold px-3 py-1 rounded-full border border-white/40 transition-colors ${lang === 'es' ? 'bg-white text-purple-800' : 'text-white'}`}>ES</button>
                <button onClick={() => setLang('en')} className={`text-xs font-semibold px-3 py-1 rounded-full border border-white/40 transition-colors ${lang === 'en' ? 'bg-white text-purple-800' : 'text-white'}`}>EN</button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
