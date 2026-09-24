import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackInitials?: string;
  fallbackColor?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackInitials,
  fallbackColor = 'bg-emerald-900/60',
  fallbackSrc,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center font-bold text-emerald-300 border border-emerald-500/20 ${fallbackColor} ${className}`}
        aria-label={alt}
      >
        <span>{fallbackInitials || alt.slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setHasError(true);
        }
      }}
      loading="lazy"
    />
  );
}
