import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrolledPast } from '../../lib/hooks';
import { Logo } from '../ui/Logo';
import './nav.css';

const LINKS = [
  { label: 'Journeys', to: '/#journeys' },
  { label: 'Flights', to: '/flights' },
  { label: 'Trains', to: '/trains' },
  { label: 'India', to: '/#india' },
  { label: 'Experiences', to: '/#experiences' },
  { label: 'About', to: '/#about' },
];

export function Nav() {
  const settled = useScrolledPast(140);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`nav${settled ? ' is-settled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <Link to="/" className="nav__mark" aria-label="Holiday Masti, home">
          <Logo className="logo--nav" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <a className="nav__plan" href="/#plan">
            Plan a trip
          </a>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__toggle-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div className="nav__panel" id="nav-panel" hidden={!open}>
        <ul className="nav__panel-list">
          {[...LINKS, { label: 'Plan a trip', to: '/#plan' }].map((link, i) => (
            <li key={link.label} style={{ '--i': i } as React.CSSProperties}>
              <Link to={link.to} className="display">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="meta nav__panel-foot">Holiday Masti · Travel India differently</p>
      </div>
    </header>
  );
}
