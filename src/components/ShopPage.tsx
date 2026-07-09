import { useState, useMemo, useEffect } from 'react'
import { products, categories } from '../data/products'
import { ProductCard } from './ProductCard'
import type { Category } from '../data/products'
import type { Lang } from '../App'

interface Props {
  lang: Lang
  initialCategory: Category | null
  onAddToCart: () => void
}

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

const t = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en

export function ShopPage({ lang, initialCategory, onAddToCart }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCategory)

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])
  const [sort, setSort] = useState<SortKey>('default')
  const [onlyUnique, setOnlyUnique] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory) list = list.filter(p => p.category === activeCategory)
    if (onlyUnique) list = list.filter(p => p.badge === 'Pieza Única')
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sort, onlyUnique])

  const allCats: (Category | null)[] = [null, ...categories.map(c => c.key)]

  const categoryLabel = (c: Category | null) => {
    if (!c) return t(lang, 'Todas', 'All')
    const found = categories.find(x => x.key === c)
    return found ? (lang === 'es' ? found.label : found.labelEn) : c
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-1" style={{ color: '#B384C8' }}>
        <span className="hover:underline cursor-pointer" onClick={() => {}}>
          {t(lang, 'Inicio', 'Home')}
        </span>
        <span>/</span>
        <span style={{ color: '#5A2D9C' }}>
          {activeCategory ?? t(lang, 'Todas las categorías', 'All categories')}
        </span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-56 shrink-0 skeu-surface rounded-2xl p-5" style={{ backgroundColor: '#fff' }}>
          <SidebarContent
            lang={lang}
            allCats={allCats}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onlyUnique={onlyUnique}
            setOnlyUnique={setOnlyUnique}
            categoryLabel={categoryLabel}
          />
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors"
                style={{ borderColor: '#B384C8', color: '#5A2D9C' }}
                onClick={() => setSidebarOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>
                {t(lang, 'Filtros', 'Filters')}
              </button>
              <span className="text-sm" style={{ color: '#B384C8' }}>
                {filtered.length} {t(lang, 'productos', 'products')}
              </span>
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="text-sm border rounded-full px-3 py-1.5 outline-none focus:ring-2 appearance-none"
              style={{ borderColor: '#B384C8', color: '#5A2D9C', backgroundColor: '#fff' }}
            >
              <option value="default">{t(lang, 'Destacados', 'Featured')}</option>
              <option value="price-asc">{t(lang, 'Precio: menor a mayor', 'Price: low to high')}</option>
              <option value="price-desc">{t(lang, 'Precio: mayor a menor', 'Price: high to low')}</option>
              <option value="name">{t(lang, 'Nombre', 'Name')}</option>
            </select>
          </div>

          {/* Active filter pills */}
          {(activeCategory || onlyUnique) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeCategory && (
                <span
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#5A2D9C' }}
                >
                  {categoryLabel(activeCategory)}
                  <button onClick={() => setActiveCategory(null)} className="hover:opacity-70">✕</button>
                </span>
              )}
              {onlyUnique && (
                <span
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border"
                  style={{ color: '#E845A3', borderColor: '#E845A3' }}
                >
                  {t(lang, 'Pieza Única', 'One of a Kind')}
                  <button onClick={() => setOnlyUnique(false)} className="hover:opacity-70">✕</button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center" style={{ color: '#B384C8' }}>
              <div className="text-5xl mb-4">🛍️</div>
              <p className="text-lg font-medium">{t(lang, 'No hay productos para esta selección.', 'No products for this selection.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto p-6 skeu-surface" style={{ backgroundColor: '#F4F0FA' }}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold" style={{ color: '#5A2D9C' }}>{t(lang, 'Filtros', 'Filters')}</span>
              <button onClick={() => setSidebarOpen(false)} className="text-lg" style={{ color: '#B384C8' }}>✕</button>
            </div>
            <SidebarContent
              lang={lang}
              allCats={allCats}
              activeCategory={activeCategory}
              setActiveCategory={(c) => { setActiveCategory(c); setSidebarOpen(false) }}
              onlyUnique={onlyUnique}
              setOnlyUnique={setOnlyUnique}
              categoryLabel={categoryLabel}
            />
          </div>
        </div>
      )}
    </main>
  )
}

function SidebarContent({
  lang, allCats, activeCategory, setActiveCategory, onlyUnique, setOnlyUnique, categoryLabel
}: {
  lang: Lang
  allCats: (Category | null)[]
  activeCategory: Category | null
  setActiveCategory: (c: Category | null) => void
  onlyUnique: boolean
  setOnlyUnique: (v: boolean) => void
  categoryLabel: (c: Category | null) => string
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#B384C8' }}>
          {t(lang, 'Categoría', 'Category')}
        </h3>
        <ul className="space-y-1">
          {allCats.map((c, i) => (
            <li key={i}>
              <button
                onClick={() => setActiveCategory(c)}
                className="w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors font-medium"
                style={{
                  backgroundColor: activeCategory === c ? '#5A2D9C' : 'transparent',
                  color: activeCategory === c ? '#fff' : '#2B2B2B',
                }}
              >
                {categoryLabel(c)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Unique items toggle */}
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#B384C8' }}>
          {t(lang, 'Disponibilidad', 'Availability')}
        </h3>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium" style={{ color: '#2B2B2B' }}>
          <input
            type="checkbox"
            checked={onlyUnique}
            onChange={e => setOnlyUnique(e.target.checked)}
            className="rounded"
            style={{ accentColor: '#E845A3' }}
          />
          {t(lang, 'Solo Pieza Única', 'Only One of a Kind')}
        </label>
      </div>
    </div>
  )
}
