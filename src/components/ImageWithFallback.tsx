import { useState } from 'react'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackBg?: string
}

export function ImageWithFallback({ src, alt, className, fallbackBg = '#e9e0f5', style, ...rest }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={className}
        style={{ backgroundColor: fallbackBg, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
        aria-label={alt}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={0.3}>
          <rect width="40" height="40" rx="8" fill="#5A2D9C" />
          <path d="M20 10C14.477 10 10 14.477 10 20s4.477 10 10 10 10-4.477 10-10S25.523 10 20 10z" fill="white" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
