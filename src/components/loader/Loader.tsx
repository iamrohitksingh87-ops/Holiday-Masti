import { useEffect, useRef, useState } from 'react';
import { imageSrc, type ImageKey } from '../../data/images';
import './loader.css';

const PRELOAD: ImageKey[] = ['lucknow-junction', 'platform-lamps', 'carriage-motion'];
const MIN_MS = 1100;

type Props = { onDone: () => void };

/** A short cinematic departure cue before the travel film opens. */
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
        <div className="loader__orbit" aria-hidden="true">
          <span className="loader__orbit-dot" />
          <span className="loader__orbit-core">HM</span>
        </div>
        <p className="loader__eyebrow meta">YOUR NEXT STORY STARTS HERE</p>
        <p className="loader__mark display">
          Holiday <span className="italic">Masti</span>
        </p>
        <div className="loader__route" aria-hidden="true">
          <span>LUCKNOW</span>
          <span className="loader__route-line"><i /></span>
          <span>INDIA</span>
          <span className="loader__route-line"><i /></span>
          <span>ANYWHERE</span>
        </div>
      </div>
      <div className="loader__progress-row">
        <p className="loader__line meta">TRAVEL / EXPLORE / ENJOY</p>
        <p className="loader__count meta">{String(Math.round(progress * 100)).padStart(3, '0')}<span>%</span></p>
      </div>
      <div className="loader__bar" role="progressbar" aria-label="Loading" aria-valuenow={Math.round(progress * 100)}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
