import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/motion';
import { imageSrc, type ImageKey } from '../../data/images';
import './loader.css';

const PRELOAD: ImageKey[] = ['lucknow-junction', 'platform-lamps', 'carriage-motion'];

type Props = {
  /** The site is now visible behind the loader — start the hero. */
  onReveal: () => void;
  /** The loader has finished and can be unmounted. */
  onDone: () => void;
};

/**
 * Departure board.
 *
 * Every way Holiday Masti moves you, in one breath: a single mark at the
 * centre of the screen changes from a plane to a train to a car to a stay
 * to a suitcase, folds into a paper plane, and flies off — drawing the logo
 * in behind it. The exit splits the screen through the logo and opens it
 * like a pair of doors onto the site.
 *
 * Everything runs on one GSAP timeline, so it is frame-exact, can be
 * fast-forwarded by any click or key, and pauses before the exit only if
 * the hero's images have not arrived yet.
 */

const MODES = [
  { label: 'Flights', icon: 'plane' },
  { label: 'Trains', icon: 'train' },
  { label: 'Road trips', icon: 'car' },
  { label: 'Stays', icon: 'stay' },
  { label: 'Journeys', icon: 'case' },
] as const;

type IconName = (typeof MODES)[number]['icon'] | 'paper';

/** Flat line-and-fill marks, drawn on one 120×120 grid so they swap in place. */
function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'plane':
      return (
        <>
          <path className="ld-line" d="M14 60 H106" />
          <path className="ld-line" d="M60 26 V46 M48 33 H72" />
          <circle className="ld-fill" cx="60" cy="61" r="15" />
          <path className="ld-ink" d="M53 57 q7 -5 14 0" />
          <circle className="ld-line" cx="34" cy="67" r="6" />
          <circle className="ld-line" cx="86" cy="67" r="6" />
        </>
      );
    case 'train':
      return (
        <>
          <path className="ld-line" d="M48 24 H72 M54 24 V30 M66 24 V30" />
          <rect className="ld-fill" x="37" y="30" width="46" height="52" rx="9" />
          <rect className="ld-ink-fill" x="44" y="37" width="32" height="20" rx="4" />
          <circle className="ld-ink-fill" cx="49" cy="70" r="3.2" />
          <circle className="ld-ink-fill" cx="71" cy="70" r="3.2" />
          <path className="ld-line" d="M49 82 L40 96 M71 82 L80 96" />
        </>
      );
    case 'car':
      return (
        <>
          <path className="ld-fill" d="M27 78 V64 L38 48 H82 L93 64 V78 Z" />
          <path className="ld-ink-fill" d="M43 53 H77 L84 63 H36 Z" />
          <circle className="ld-ink-fill" cx="40" cy="70" r="3.6" />
          <circle className="ld-ink-fill" cx="80" cy="70" r="3.6" />
          <path className="ld-line" d="M50 70 H70 M34 78 V87 M86 78 V87" />
        </>
      );
    case 'stay':
      return (
        <>
          <path className="ld-fill" d="M30 58 L60 32 L90 58 V90 H30 Z" />
          <rect className="ld-ink-fill" x="52" y="68" width="16" height="22" rx="2" />
          <rect className="ld-ink-fill" x="38" y="62" width="9" height="9" rx="1.5" />
          <rect className="ld-ink-fill" x="73" y="62" width="9" height="9" rx="1.5" />
        </>
      );
    case 'case':
      return (
        <>
          <path className="ld-line" d="M50 42 V33 H70 V42" />
          <rect className="ld-fill" x="31" y="42" width="58" height="44" rx="8" />
          <path className="ld-ink" d="M46 42 V86 M74 42 V86" />
          <path className="ld-line" d="M40 86 V91 M80 86 V91" />
        </>
      );
    case 'paper':
      return (
        <>
          <path className="ld-fill" d="M22 64 L98 32 L76 92 L60 70 Z" />
          <path className="ld-ember-deep" d="M60 70 L98 32 L58 88 Z" />
          <path className="ld-ink" d="M60 70 L98 32" />
        </>
      );
  }
}

const TAG = 'India / In Motion';

/** The finished lockup. Rendered twice: once to animate in, once as the bottom door. */
function Brand() {
  return (
    <div className="ld-brand">
      <img className="ld-logo" src="/brand/holiday-masti-logo-white.png" alt="" width={2048} height={682} />
      <p className="ld-tag meta">
        {TAG.split('').map((ch, i) => (
          <span key={i}>{ch === ' ' ? ' ' : ch}</span>
        ))}
      </p>
    </div>
  );
}

export function Loader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    /* ---- Preload the hero's opening frames -------------------------- */
    let loaded = false;
    let settled = 0;
    let waiting = false;
    let tl: gsap.core.Timeline | null = null;

    const markLoaded = () => {
      if (loaded) return;
      loaded = true;
      setProgress(1);
      if (waiting) tl?.play();
    };
    const step = () => {
      settled += 1;
      setProgress(Math.min(0.94, settled / PRELOAD.length));
      if (settled >= PRELOAD.length) markLoaded();
    };
    const imgs = PRELOAD.map((key) => {
      const img = new Image();
      img.onload = step;
      img.onerror = step;
      img.src = imageSrc(key, 1920);
      return img;
    });
    // Never hold the page hostage to a slow network.
    const bail = window.setTimeout(markLoaded, 6000);

    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T & HTMLElement>(sel));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: onDone });

      if (reduced) {
        // A still title card, then a plain fade.
        gsap.set(q('.ld-logo'), { clipPath: 'inset(0 0% 0 0)' });
        gsap.set(q('.ld-tag span'), { opacity: 1, y: 0 });
        tl.addLabel('exit', 0.6)
          .call(() => {
            if (!loaded) {
              waiting = true;
              tl!.pause();
            }
          }, undefined, 'exit')
          .call(onReveal, undefined, 'exit+=0.01')
          .to(el, { opacity: 0, duration: 0.4, ease: 'none' }, 'exit+=0.01');
        return;
      }

      const icons = q('.ld-icon');
      const labels = q('.ld-label');
      const [plane, train, car, stay, kase, paper] = icons;

      /* 1 · Lines shoot in from the four edges and meet the mark ------- */
      tl.fromTo(q('.ld-beam--l'), { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, 0)
        .fromTo(q('.ld-beam--r'), { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, 0.06)
        .fromTo(q('.ld-beam--t'), { scaleY: 0 }, { scaleY: 1, duration: 0.55, ease: 'expo.out' }, 0.1)
        .fromTo(q('.ld-beam--b'), { scaleY: 0 }, { scaleY: 1, duration: 0.55, ease: 'expo.out' }, 0.14)
        .to(q('.ld-beam'), { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.62);

      /* 2 · One mark, five ways to travel ------------------------------ */
      const HOLD = 0.36;
      const swap = (out: HTMLElement | null, inn: HTMLElement, outLabel: HTMLElement | null, inLabel: HTMLElement, at: number) => {
        if (out) tl!.to(out, { scale: 0.55, opacity: 0, duration: 0.16, ease: 'power2.in' }, at);
        if (outLabel) tl!.to(outLabel, { opacity: 0, y: -6, duration: 0.16, ease: 'power2.in' }, at);
        tl!.fromTo(inn, { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.2)' }, at + 0.12)
          .fromTo(inLabel, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.24 }, at + 0.14);
      };
      const order = [plane, train, car, stay, kase];
      order.forEach((icon, i) => swap(order[i - 1] ?? null, icon, labels[i - 1] ?? null, labels[i], 0.32 + i * HOLD));

      /* 3 · Fold to a paper plane and take off ------------------------- */
      const fold = 0.32 + order.length * HOLD;
      tl.to(kase, { scaleY: 0.08, opacity: 0, duration: 0.18, ease: 'power2.in' }, fold)
        .to(labels[labels.length - 1], { opacity: 0, duration: 0.16 }, fold)
        .fromTo(paper, { scale: 0.4, rotate: -30, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.28, ease: 'back.out(2)' }, fold + 0.14)
        .addLabel('flight', fold + 0.5)
        // x and y on different curves, so the flight climbs the same arc
        // the trail draws behind it.
        .to(q('.ld-mark'), { x: '36vw', duration: 0.95, ease: 'power1.in' }, 'flight')
        .to(q('.ld-mark'), { y: '-26vh', scale: 0.55, rotate: -14, duration: 0.95, ease: 'power3.in' }, 'flight')
        .to(q('.ld-mark'), { opacity: 0, duration: 0.22 }, 'flight+=0.75')
        .fromTo(q('.ld-trail'), { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 50%)', duration: 0.95, ease: 'power1.in' }, 'flight')
        .to(q('.ld-trail'), { opacity: 0, duration: 0.45 }, 'flight+=1.0')

        /* 4 · The logo draws in behind the plane; the line assembles --- */
        .fromTo(q('.ld-logo'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut' }, 'flight+=0.18')
        .fromTo(
          q('.ld-tag span'),
          { opacity: 0, y: () => gsap.utils.random(-14, 14), x: () => gsap.utils.random(-6, 6), clipPath: 'inset(0 0 55% 0)' },
          { opacity: 1, y: 0, x: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.42, stagger: { each: 0.03, from: 'random' } },
          'flight+=0.6'
        )
        .addLabel('exit', 'flight+=1.55');

      // Hold here only if the hero's frames still aren't in.
      tl.call(() => {
        if (!loaded) {
          waiting = true;
          tl!.pause();
        }
      }, undefined, 'exit');

      /* 5 · The doors open ------------------------------------------
       * An ember seam cuts across the lockup, then the screen parts at it
       * like a pair of doors — the top half rising, the bottom half falling,
       * the logo split straight through the middle. Behind them the hero
       * settles from a slight push-in. No fade, nothing hides the cut.
       *
       * The bottom door is a second copy of the finished lockup, shown only
       * at the instant of the split, so the halves line up to the pixel.
       */
      const door = q('.ld-door');
      const seams = q('.ld-seam');
      const film = document.querySelector<HTMLElement>('.hero .film');
      // The cut goes through the middle of the logo as it actually sits on
      // screen, measured at the moment of the exit rather than assumed.
      let splitY = window.innerHeight / 2;
      tl.call(() => {
        const logo = el.querySelector<HTMLElement>('.ld-stage .ld-logo');
        if (logo) {
          const r = logo.getBoundingClientRect();
          splitY = Math.round(r.top + r.height / 2);
        }
        el.style.setProperty('--split', `${splitY}px`);
      }, undefined, 'exit');

      tl.fromTo(seams, { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: 'expo.out' }, 'exit+=0.02')
        .set(q('.ld-stage'), { clipPath: () => `inset(0px 0px ${window.innerHeight - splitY}px 0px)` }, 'exit+=0.3')
        .set(door, { clipPath: () => `inset(${splitY}px 0px 0px 0px)`, autoAlpha: 1 }, 'exit+=0.3')
        .set(q('.ld-bar'), { autoAlpha: 0 }, 'exit+=0.3')
        .to([q('.ld-stage'), seams[0]], { y: () => -(splitY + 24), duration: 1.05, ease: 'expo.inOut' }, 'exit+=0.3')
        .to([door, seams[1]], { y: () => window.innerHeight - splitY + 24, duration: 1.05, ease: 'expo.inOut' }, 'exit+=0.3')
        .to(seams, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 'exit+=0.75')
        // Hand over while the doors are still moving: the headline rises
        // into the opening rather than after it.
        .call(onReveal, undefined, 'exit+=0.45');
      if (film) {
        tl.fromTo(film, { scale: 1.14 }, { scale: 1, duration: 1.5, ease: 'power3.out', clearProps: 'transform' }, 'exit+=0.3');
      }
      tl.set(el, { autoAlpha: 0 });
    }, el);

    // Any intent to move on plays it out at speed — never a hostage screen.
    const hurry = () => tl?.timeScale(3.2);
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, hurry, { passive: true }));

    // Dev-only handle so the demo recorder can scrub frame-exact.
    if (import.meta.env.DEV) (window as unknown as { __hmLoader?: unknown }).__hmLoader = tl;

    return () => {
      window.clearTimeout(bail);
      events.forEach((e) => window.removeEventListener(e, hurry));
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      ctx.revert();
    };
  }, [onReveal, onDone]);

  return (
    <div className="loader" ref={root} aria-hidden="true">
      {/* Bottom door: hidden until the split, then carries the lower half away. */}
      <div className="ld-door on-dark">
        <div className="ld-content">
          <Brand />
        </div>
      </div>
      <div className="ld-stage on-dark">
        <span className="ld-beam ld-beam--l" />
        <span className="ld-beam ld-beam--r" />
        <span className="ld-beam ld-beam--t" />
        <span className="ld-beam ld-beam--b" />

        <svg className="ld-trail" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 50 C 62 52, 74 40, 86 24" />
        </svg>

        <div className="ld-content">
          <div className="ld-mark">
            {[...MODES.map((m) => m.icon), 'paper' as const].map((name) => (
              <svg key={name} className="ld-icon" viewBox="0 0 120 120">
                <Icon name={name} />
              </svg>
            ))}
          </div>

          <div className="ld-labels">
            {MODES.map((m) => (
              <span key={m.label} className="ld-label meta">
                {m.label}
              </span>
            ))}
          </div>

          <Brand />
        </div>

        <div className="ld-bar" role="progressbar" aria-label="Loading" aria-valuenow={Math.round(progress * 100)}>
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <span className="ld-seam" />
      <span className="ld-seam" />
    </div>
  );
}
