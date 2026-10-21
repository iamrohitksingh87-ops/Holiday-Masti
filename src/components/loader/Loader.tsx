import { useEffect, useRef, useState } from 'react';
import { imageSrc, type ImageKey } from '../../data/images';
import './loader.css';

const PRELOAD: ImageKey[] = ['lucknow-junction', 'platform-lamps', 'carriage-motion'];
const MIN_MS = 1500;

type Props = { onDone: () => void };

/** Travel-led intro: a night journey across India, then reveal the site. */
export function Loader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const started = performance.now();
    let settled = 0;
    let finishTimer = 0;
    let exitTimer = 0;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      finishTimer = window.setTimeout(() => {
        setProgress(1);
        setLeaving(true);
        exitTimer = window.setTimeout(onDone, 750);
      }, wait);
    };

    const step = () => {
      settled += 1;
      setProgress(Math.min(0.92, settled / PRELOAD.length));
      if (settled >= PRELOAD.length) finish();
    };

    const imgs = PRELOAD.map((key) => {
      const img = new Image();
      img.onload = step;
      img.onerror = step;
      img.src = imageSrc(key, 1920);
      return img;
    });

    const bail = window.setTimeout(finish, 5000);
    return () => {
      window.clearTimeout(bail);
      window.clearTimeout(finishTimer);
      window.clearTimeout(exitTimer);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [onDone]);

  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__backdrop" style={{ backgroundImage: `url("${imageSrc('lucknow-junction', 1920)}")` }} />
      <div className="loader__shade" />
      <div className="loader__journey">
        <p className="loader__eyebrow meta">INDIA IS CALLING</p>
        <h1 className="loader__mark display">Every journey<br /><span className="italic">has a story.</span></h1>
        <div className="loader__map" aria-label="A journey from Lucknow across India">
          <svg viewBox="0 0 720 250" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff5a1f" />
                <stop offset="100%" stopColor="#f1d8b2" />
              </linearGradient>
            </defs>
            <path className="loader__map-contour" d="M88 70 C130 24 174 44 205 70 S275 105 299 71 S361 42 390 75 S449 118 477 82 S542 51 566 92 S620 124 647 92" />
            <path className="loader__route-track" d="M70 176 C155 205 204 136 276 153 S382 205 451 139 S561 109 655 54" />
            <path className="loader__route-active" d="M70 176 C155 205 204 136 276 153 S382 205 451 139 S561 109 655 54" />
            <circle className="loader__pin loader__pin--start" cx="70" cy="176" r="5" />
            <circle className="loader__pin" cx="276" cy="153" r="4" />
            <circle className="loader__pin" cx="451" cy="139" r="4" />
            <circle className="loader__pin loader__pin--end" cx="655" cy="54" r="5" />
            <g className="loader__plane">
              <animateMotion dur="2.5s" begin="0.15s" fill="freeze" rotate="auto" path="M70 176 C155 205 204 136 276 153 S382 205 451 139 S561 109 655 54" />
              <text x="0" y="0">✈</text>
            </g>
          </svg>
          <div className="loader__destination loader__destination--start"><span>STARTING FROM</span><strong>LUCKNOW</strong></div>
          <div className="loader__destination loader__destination--middle"><span>FOLLOW THE FEELING</span><strong>EXPLORE INDIA</strong></div>
          <div className="loader__destination loader__destination--end"><span>YOUR NEXT CHAPTER</span><strong>AWAITS</strong></div>
        </div>
        <div className="loader__brand"><span>HM</span><i /> HOLIDAY MASTI</div>
      </div>
      <div className="loader__progress-row">
        <p className="loader__line meta">TRAVEL · EXPLORE · ENJOY</p>
        <p className="loader__count meta">{String(Math.round(progress * 100)).padStart(3, '0')}<span>%</span></p>
      </div>
      <div className="loader__bar" role="progressbar" aria-label="Loading" aria-valuenow={Math.round(progress * 100)}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
