import { useRef, type ReactNode } from 'react';
import { Figure } from '../ui/Figure';
import { gsap, revealIn } from '../../lib/motion';
import { useIsoLayoutEffect, useReducedMotion } from '../../lib/hooks';
import type { ImageKey } from '../../data/images';
import './modes.css';
// The search bar is deliberately the same stylesheet as the package search,
// so the two can never drift apart visually.
import '../search/search.css';

type Props = {
  id: string;
  label: string;
  /** One line per array entry; they rise in sequence. */
  title: string[];
  copy: string;
  image: ImageKey;
  /** Small slate over the frame, matching the hero's grammar. */
  slate: string;
  children: ReactNode;
};

/**
 * The shared shell behind the Flights and Trains sections: a cinematic frame
 * with its own photograph, an editorial headline over it, and a search bar
 * underneath on the same sand ground as the package search.
 *
 * It is one component so that both sections stay identical in construction —
 * only the picture, the words and the fields change.
 */
export function ModeSection({ id, label, title, copy, image, slate, children }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const cleanup = revealIn(root.current);
    if (reduced) return cleanup;

    const frame = root.current.querySelector<HTMLElement>('[data-mode-frame] img');
    if (!frame) return cleanup;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current!.querySelector('[data-mode-frame]')!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, root);

    return () => {
      ctx.revert();
      cleanup();
    };
  }, [reduced]);

  return (
    <section className="mode" id={id} ref={root} aria-labelledby={`${id}-title`}>
      <div className="mode__stage on-dark">
        <div className="mode__frame" data-mode-frame>
          <Figure name={image} sizes="100vw" />
          <div className="mode__veil" />
          <div className="grain" />
        </div>

        <div className="shell mode__body">
          <p className="meta mode__label" data-reveal="up">
            {label}
          </p>

          <h2 className="display display--tight mode__title" id={`${id}-title`} data-reveal="mask">
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p className="mode__copy" data-reveal="up" data-reveal-delay="0.08">
            {copy}
          </p>
        </div>

        <p className="meta mode__slate">{slate}</p>
      </div>

      <div className="find find--mode">
        <div className="shell">{children}</div>
      </div>
    </section>
  );
}
