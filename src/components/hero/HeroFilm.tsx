import { useEffect, useState } from 'react';
import { Figure } from '../ui/Figure';
import { useReducedMotion } from '../../lib/hooks';
import type { ImageKey } from '../../data/images';

export type Shot = { image: ImageKey; place: string; time: string };

/**
 * The opening film.
 *
 * The brief asks for a cinematic night-train sequence. Rather than settle for
 * flat stock footage that would undercut the rest of the art direction, the
 * hero is cut from stills the way a title sequence is: long dissolves, a slow
 * push on each frame, grain over the top. It reads as film, it weighs a
 * fraction of a video, and it never fails to play.
 *
 * When real footage exists, pass `videoSrc` (and `poster`) and it takes over
 * this frame completely — nothing else in the hero has to change.
 */
export function HeroFilm({
  shots,
  videoSrc,
  poster,
  muted,
  onShotChange,
}: {
  shots: Shot[];
  videoSrc?: string;
  poster?: string;
  muted?: boolean;
  onShotChange?: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (videoSrc || reduced || shots.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % shots.length), 6200);
    return () => window.clearInterval(id);
  }, [videoSrc, reduced, shots.length]);

  // Reported from an effect rather than from inside the updater, so the slate
  // can never drift out of step with the frame on screen.
  useEffect(() => onShotChange?.(index), [index, onShotChange]);

  if (videoSrc) {
    return (
      <div className="film">
        <video
          className="film__video"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted={muted !== false}
          loop
          playsInline
          preload="metadata"
        />
        <div className="film__warm" />
        <div className="film__scrim" />
        <div className="grain" />
      </div>
    );
  }

  return (
    <div className="film">
      {shots.map((shot, i) => (
        <div
          key={shot.image}
          className={`film__shot${i === index ? ' is-live' : ''}`}
          aria-hidden={i !== index}
        >
          <Figure
            name={shot.image}
            priority={i === 0}
            sizes="100vw"
            className={i === index && !reduced ? 'film__frame is-drifting' : 'film__frame'}
          />
        </div>
      ))}
      <div className="film__warm" />
      <div className="film__scrim" />
      <div className="grain" />
    </div>
  );
}
