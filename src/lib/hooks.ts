import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useMediaQuery(query: string, fallback = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? fallback : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True only for real pointing devices — the custom cursor never runs on touch. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/** Fires once, the first time the visitor scrolls at all. */
export function useHasScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ignoreInitialScroll = true;

    const unlock = window.setTimeout(() => {
      ignoreInitialScroll = false;
    }, 500);

    const onScroll = () => {
      if (ignoreInitialScroll) return;

      if (window.scrollY > 4) {
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(unlock);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scrolled;
}

/** Scroll position crossing a threshold, for the navigation's resting state. */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return past;
}

/** A stable ref that always holds the latest value. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
