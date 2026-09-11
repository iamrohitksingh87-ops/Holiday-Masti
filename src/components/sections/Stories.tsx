import { useRef, useState } from 'react';
import { Figure } from '../ui/Figure';
import { stories } from '../../data/stories';
import { revealIn } from '../../lib/motion';
import { useIsoLayoutEffect } from '../../lib/hooks';
import './stories.css';

export function Stories() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const story = stories[i];

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    return revealIn(root.current);
  }, []);

  const go = (step: number) => setI((v) => (v + step + stories.length) % stories.length);

  return (
    <section className="tale section" ref={root} id="stories" aria-labelledby="tale-title">
      <div className="shell tale__grid">
        <p className="meta tale__eyebrow" id="tale-title" data-reveal="up">
          Traveller stories
        </p>

        <blockquote className="tale__quote" key={story.name}>
          <p className="display display--tight tale__text">“{story.quote}”</p>
          <footer className="tale__by">
            <cite className="tale__name">{story.name}</cite>
            <span className="meta tale__where">
              {story.from} · {story.journey}
            </span>
          </footer>
        </blockquote>

        <figure className="tale__portrait" key={`${story.name}-frame`}>
          <Figure name={story.frame} sizes="(min-width: 900px) 24vw, 55vw" ratio="4 / 5" />
          <figcaption className="meta">{story.place}</figcaption>
        </figure>

        <div className="tale__nav">
          <button onClick={() => go(-1)} aria-label="Previous story" className="tale__arrow">
            ←
          </button>
          <span className="meta tale__count">
            {String(i + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
          </span>
          <button onClick={() => go(1)} aria-label="Next story" className="tale__arrow">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
