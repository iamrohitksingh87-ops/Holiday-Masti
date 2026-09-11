import { useEffect, useRef, useState } from 'react';
import { imageSrc, type ImageKey } from '../../data/images';
import './loader.css';

const PRELOAD: ImageKey[] = ['lucknow-junction', 'platform-lamps', 'carriage-motion'];
const MIN_MS = 1100;

type Props = { onDone: () => void };

/**
 * A held breath, not a spinner. It waits for the frames the hero opens on and
 * for a floor of just over a second, then lifts like a curtain.
 */
export function Loader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const started = performance.now();
    let settled = 0;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        setProgress(1);
        setLeaving(true);
        window.setTimeout(onDone, 900);
      }, wait);
    };

    const step = () => {
      settled += 1;
      setProgress(Math.min(0.95, settled / PRELOAD.length));
      if (settled >= PRELOAD.length) finish();
    };

    const imgs = PRELOAD.map((key) => {
      const img = new Image();
      img.onload = step;
      img.onerror = step;
      img.src = imageSrc(key, 1920);
      return img;
    });

    // Never hold the page hostage to a slow network.
    const bail = window.setTimeout(finish, 6000);

    return () => {
      window.clearTimeout(bail);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [onDone]);

  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__inner">
        <p className="loader__mark display">
          Holiday <span className="italic">Masti</span>
        </p>
        <p className="meta loader__line">India / In Motion</p>
      </div>
      <div className="loader__bar" role="progressbar" aria-label="Loading" aria-valuenow={Math.round(progress * 100)}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p className="loader__count meta">{String(Math.round(progress * 100)).padStart(3, '0')}</p>
    </div>
  );
}
