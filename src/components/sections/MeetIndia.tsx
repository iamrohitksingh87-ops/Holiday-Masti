import { useRef, useState } from 'react';
import { Figure } from '../ui/Figure';
import { regions } from '../../data/regions';
import { revealIn } from '../../lib/motion';
import { useIsDesktop, useIsoLayoutEffect } from '../../lib/hooks';
import './meet-india.css';

/**
 * Meet India.
 *
 * Not a map with pins on it. The eight regions are drawn as an index — eight
 * points in roughly true relative positions, joined by one hairline, with the
 * live one filled. Choosing a point changes the frame beside it. On a phone
 * the whole device is dropped and it becomes a vertical read, which is what a
 * phone is good at.
 */

function Constellation({ activeId, onPick }: { activeId: string; onPick: (id: string) => void }) {
  // The thread runs north to south, the way you would actually travel it.
  const thread = [...regions].sort((a, b) => a.y - b.y);

  return (
    <svg className="atlas" viewBox="-6 -6 112 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <polyline
        className="atlas__thread"
        points={thread.map((r) => `${r.x},${r.y}`).join(' ')}
        fill="none"
      />
      {regions.map((r) => (
        <g
          key={r.id}
          className={`atlas__node${r.id === activeId ? ' is-active' : ''}`}
          onPointerEnter={() => onPick(r.id)}
        >
          <circle cx={r.x} cy={r.y} r="7" className="atlas__hit" />
          <circle cx={r.x} cy={r.y} r="1.9" className="atlas__dot" />
          <circle cx={r.x} cy={r.y} r="5.4" className="atlas__ring" />
        </g>
      ))}
    </svg>
  );
}

export function MeetIndia() {
  const root = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(regions[0].id);
  const desktop = useIsDesktop();
  const active = regions.find((r) => r.id === activeId) ?? regions[0];

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    return revealIn(root.current);
  }, [desktop]);

  return (
    <section className="india section" ref={root} id="india" aria-labelledby="india-title">
      <div className="shell india__head">
        <p className="meta" data-reveal="up">
          Meet India
        </p>
        <h2 className="display display--tight india__title" id="india-title" data-reveal="mask">
          <span>Eight countries</span>
          <span>wearing one name.</span>
        </h2>
      </div>

      {desktop ? (
        <div className="shell india__stage">
          <div className="india__list">
            <ul>
              {regions.map((region) => (
                <li key={region.id}>
                  <button
                    className={`india__pick${region.id === activeId ? ' is-active' : ''}`}
                    onPointerEnter={() => setActiveId(region.id)}
                    onFocus={() => setActiveId(region.id)}
                    onClick={() => setActiveId(region.id)}
                    aria-pressed={region.id === activeId}
                  >
                    <span className="india__pick-name display">{region.name}</span>
                    <span className="india__pick-sub meta">{region.sub}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Constellation activeId={activeId} onPick={setActiveId} />
          </div>

          <div className="india__panel">
            <div className="india__frame">
              {/* Keyed so each region loads exactly one file and fades in on its own. */}
              <Figure key={active.image} name={active.image} sizes="52vw" className="india__img" />
            </div>
            <div className="india__caption" key={`${active.id}-text`}>
              <p className="meta india__season">Best {active.season}</p>
              <p className="copy india__copy">{active.copy}</p>
            </div>
          </div>
        </div>
      ) : (
        <ol className="india__scroll">
          {regions.map((region, i) => (
            <li key={region.id} className="india__card" data-reveal="up">
              <div className="india__card-frame">
                <Figure name={region.image} sizes="92vw" ratio="4 / 5" />
              </div>
              <p className="meta india__card-index">
                {String(i + 1).padStart(2, '0')} — Best {region.season}
              </p>
              <h3 className="display india__card-name">{region.name}</h3>
              <p className="meta india__card-sub">{region.sub}</p>
              <p className="copy india__card-copy">{region.copy}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
