import { useCallback, useState } from 'react';
import {
  imageAlt,
  imageFocus,
  imageLqip,
  imageSrc,
  imageSrcSet,
  type ImageKey,
} from '../../data/images';
import './figure.css';

type Props = {
  name: ImageKey;
  /** Sizes hint; default assumes a full-bleed frame. */
  sizes?: string;
  /** Above-the-fold frames load eagerly and are fetched at high priority. */
  priority?: boolean;
  className?: string;
  /** Override the generated alt when the surrounding copy already says it. */
  alt?: string;
  ratio?: string;
};

/**
 * One picture, done properly: a blurred 24px placeholder underneath, a
 * responsive `srcset` over it, and a fade that only runs once the real file
 * has decoded. Cropping is controlled per-image by a focal point so nothing
 * important ever lands outside the frame.
 */
export function Figure({
  name,
  sizes = '100vw',
  priority = false,
  className,
  alt,
  ratio,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  // An image served from cache can already be complete by the time React
  // attaches `onLoad`, and that event never arrives. Check on mount instead.
  const bind = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span
      className={['fig', loaded && 'is-loaded', className].filter(Boolean).join(' ')}
      style={
        {
          '--fig-lqip': `url(${imageLqip(name)})`,
          '--fig-focus': imageFocus(name),
          ...(ratio ? { '--fig-ratio': ratio } : null),
        } as React.CSSProperties
      }
    >
      <img
        ref={bind}
        className="fig__img"
        src={imageSrc(name, priority ? 1920 : 1280)}
        srcSet={imageSrcSet(name)}
        sizes={sizes}
        alt={alt ?? imageAlt(name)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // @ts-expect-error fetchpriority is valid HTML, typed in newer React
        fetchpriority={priority ? 'high' : undefined}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </span>
  );
}
