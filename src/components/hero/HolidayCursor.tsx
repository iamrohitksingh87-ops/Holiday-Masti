import { useEffect, useRef, useState } from 'react';
import './holiday-cursor.css';

export function HolidayCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    let observer: IntersectionObserver | null = null;

    // Homepage has the Hero. Dedicated pages such as Flights / Trains do not.
    if (hero) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // Holiday cursor is active only after the Hero is no longer visible.
          setVisible(!entry.isIntersecting);
        },
        {
          threshold: 0,
        }
      );

      observer.observe(hero);
    } else {
      // Flights / Trains pages: no Hero, so keep the cursor active.
      setVisible(true);
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform =
          `translate3d(${x}px, ${y + 22}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      observer?.disconnect();
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`holiday-cursor${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <div ref={cursorRef} className="holiday-cursor__dot" />

      <div ref={trailRef} className="holiday-cursor__trail">
        <span>HOLIDAY MASTI</span>
        <span>·</span>
        <span>HOLIDAY MASTI</span>
        <span>·</span>
      </div>
    </div>
  );
}