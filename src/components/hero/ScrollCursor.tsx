import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../../lib/hooks';
import './scroll-cursor.css';

/**
 * Hero SCROLL DOWN cursor.
 * Follows the pointer and remains active while the Hero is active.
 * Pointer devices only.
 */
export function ScrollCursor({ active }: { active: boolean }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const [awake, setAwake] = useState(true);

  const visible = active && fine && !reduced;

  useEffect(() => {
    if (!visible) return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setAwake(true);
    };

    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;

      el.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className={`scroll-cursor${awake ? ' is-awake' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="scroll-cursor__ring"
        aria-hidden="true"
      >
        <defs>
          <path
            id="hm-cursor-arc"
            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
        </defs>

        <text className="scroll-cursor__text">
          <textPath
            href="#hm-cursor-arc"
            startOffset="0"
          >
            SCROLL DOWN · SCROLL DOWN ·
          </textPath>
        </text>
      </svg>

      <span className="scroll-cursor__dot" />
    </div>
  );
}