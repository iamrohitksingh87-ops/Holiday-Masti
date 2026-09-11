import { useCallback, useEffect, useRef, useState } from 'react';
import { createAmbience, type Ambience } from '../../lib/ambience';

const KEY = 'hm:sound';

/**
 * Sound is never forced on anyone: the page opens silent, this is the only way
 * to start it, and the choice is remembered for the session — including the
 * choice to turn it back off. On mobile it behaves identically, because it is
 * a tap either way.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const [level, setLevel] = useState(0);
  const ambience = useRef<Ambience | null>(null);

  useEffect(() => {
    ambience.current = createAmbience({ volume: 0.15 });
    return () => {
      ambience.current?.dispose();
      ambience.current = null;
    };
  }, []);

  // A previous "on" in this session cannot auto-resume audio — browsers require
  // a gesture — so it is restored as intent and honoured on the first click.
  useEffect(() => {
    if (sessionStorage.getItem(KEY) === 'on') setLevel(0);
  }, []);

  // Bars idle when muted and breathe when playing.
  useEffect(() => {
    if (!on) {
      setLevel(0);
      return;
    }
    let frame = 0;
    const loop = () => {
      setLevel(Math.random());
      frame = window.setTimeout(loop, 220);
    };
    loop();
    return () => window.clearTimeout(frame);
  }, [on]);

  const toggle = useCallback(async () => {
    const next = !on;
    setOn(next);
    sessionStorage.setItem(KEY, next ? 'on' : 'off');
    try {
      if (next) await ambience.current?.enable();
      else ambience.current?.disable();
    } catch {
      setOn(false);
    }
  }, [on]);

  return (
    <button
      className={`sound${on ? ' is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      title={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}
    >
      <span className="sound__bars" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <i
            key={i}
            style={{
              transform: `scaleY(${on ? 0.28 + ((level * 7 + i * 3.1) % 1) * 0.72 : 0.18})`,
            }}
          />
        ))}
      </span>
      <span className="sound__label meta">Sound {on ? 'on' : 'off'}</span>
    </button>
  );
}
