import logoSrc from '../imports/ab-logo-mark.png'
import type { Lang } from '../App'
import type { Page } from '../App'

interface Props {
  lang: Lang
  onNav: (p: Page) => void
}

const t = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en

export function Footer({ lang, onNav }: Props) {
  return (
    <footer className="skeu-surface-dark" style={{ backgroundColor: '#1a0a30' }}>
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoSrc}
                alt="Always Beautiful"
                className="h-10 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span
                className="text-white font-semibold text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Always Beautiful
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {t(lang,
                'Fajas colombianas y ropa deportiva premium. Envíos a todo Estados Unidos.',
                'Colombian shapewear and premium activewear. Ships across the United States.'
              )}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/alwaysbeautifulmultimarca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' }}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/16504047700"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: '#25D366' }}
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.854L.057 23.89l6.205-1.43A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.649-.522-5.154-1.431l-.369-.219-3.823.881.912-3.717-.239-.381A9.962 9.962 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t(lang, 'Tienda', 'Shop')}
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                [t(lang, 'Fajas', 'Shapewear'), 'shop'],
                [t(lang, 'Leggings', 'Leggings'), 'shop'],
                [t(lang, 'Conjuntos', 'Sets'), 'shop'],
                [t(lang, 'Tops Deportivos', 'Sport Tops'), 'shop'],
                [t(lang, 'Ofertas', 'Sale'), 'shop'],
              ].map(([label]) => (
                <li key={label}>
                  <button
                    onClick={() => onNav('shop')}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t(lang, 'Información', 'Information')}
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                t(lang, 'Sobre Nosotros', 'About Us'),
                t(lang, 'Guía de Tallas', 'Size Guide'),
                t(lang, 'Envíos y Devoluciones', 'Shipping & Returns'),
                t(lang, 'Política de Privacidad', 'Privacy Policy'),
                t(lang, 'Términos y Condiciones', 'Terms & Conditions'),
              ].map((label) => (
                <li key={label}>
                  <span className="hover:text-white transition-colors cursor-pointer">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t(lang, 'Contacto', 'Contact')}
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a
                  href="https://wa.me/16504047700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span style={{ color: '#25D366' }}>●</span>
                  WhatsApp: +1 (650) 404-7700
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/alwaysbeautifulmultimarca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span style={{ color: '#E845A3' }}>●</span>
                  @alwaysbeautifulmultimarca
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: '#B384C8' }}>●</span>
                {t(lang, 'Hecho en Colombia', 'Made in Colombia')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Always Beautiful. {t(lang, 'Todos los derechos reservados.', 'All rights reserved.')}</p>
          <a href="#" className="hover:text-white/60 transition-colors">
            Designed by Mazhar Creative Agency
          </a>
        </div>
      </div>
    </footer>
  )
}
