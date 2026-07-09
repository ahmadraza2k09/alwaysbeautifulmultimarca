import { useState } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ShopPage } from './components/ShopPage'
import { Footer } from './components/Footer'
import type { Category } from './data/products'

export type Page = 'home' | 'shop'
export type Lang = 'es' | 'en'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [lang, setLang] = useState<Lang>('es')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [cartCount, setCartCount] = useState(0)

  const goToShop = (cat?: Category) => {
    setActiveCategory(cat ?? null)
    setPage('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F0FA' }}>
      <Header
        lang={lang}
        setLang={setLang}
        onNav={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        onShopCategory={goToShop}
        cartCount={cartCount}
        currentPage={page}
      />
      {page === 'home' && (
        <HomePage lang={lang} onShop={goToShop} onAddToCart={() => setCartCount(c => c + 1)} />
      )}
      {page === 'shop' && (
        <ShopPage lang={lang} initialCategory={activeCategory} onAddToCart={() => setCartCount(c => c + 1)} />
      )}
      <Footer lang={lang} onNav={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </div>
  )
}
