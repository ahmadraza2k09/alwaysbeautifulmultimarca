import { useState } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ShopPage } from './components/ShopPage'
import { ProductDetailPage } from './components/ProductDetailPage'
import { Footer } from './components/Footer'
import type { Category, Product } from './data/products'

export type Page = 'home' | 'shop' | 'product'
export type Lang = 'es' | 'en'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [lang, setLang] = useState<Lang>('es')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartCount, setCartCount] = useState(0)

  const goToShop = (cat?: Category) => {
    setActiveCategory(cat ?? null)
    setPage('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectProduct = (p: Product) => {
    setSelectedProduct(p)
    setPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (qty: number = 1) => setCartCount((c) => c + qty)

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
        <HomePage lang={lang} onShop={goToShop} onAddToCart={addToCart} onSelectProduct={selectProduct} />
      )}
      {page === 'shop' && (
        <ShopPage lang={lang} initialCategory={activeCategory} onAddToCart={addToCart} onSelectProduct={selectProduct} />
      )}
      {page === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          lang={lang}
          onAddToCart={addToCart}
          onNavHome={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          onNavCategory={(cat) => goToShop(cat)}
        />
      )}
      <Footer lang={lang} onNav={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </div>
  )
}
