import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import './footer.css';

const COLUMNS = [
  {
    title: 'Travel',
    links: [
      { label: 'Journeys', href: '/#journeys' },
      { label: 'Flights', href: '/#flights' },
      { label: 'Trains', href: '/#trains' },
      { label: 'Experiences', href: '/#experiences' },
      { label: 'India', href: '/#india' },
      { label: 'Plan a trip', href: '/#plan' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Traveller stories', href: '/#stories' },
      { label: 'Contact', href: 'mailto:hello@holidaymasti.in' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Journal', href: '/#about' },
      { label: 'Careers', href: 'mailto:hello@holidaymasti.in' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="foot on-dark">
      <div className="shell foot__inner">
        <div className="foot__brand">
          <Link to="/" className="foot__mark" aria-label="Holiday Masti, home">
            <Logo className="logo--foot" />
          </Link>
          <p className="foot__line">Travel India differently.</p>
        </div>

        <nav className="foot__cols" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="meta foot__col-title">{col.title}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell foot__base">
        <p className="meta">© {new Date().getFullYear()} Holiday Masti</p>
        {/* CC BY-SA requires the photographer to be named wherever the image
            is used, so the credit line is functional, not decorative. */}
        <p className="meta foot__credit">
          
          <a
            href="https://commons.wikimedia.org/wiki/File:Charbagh_Railway.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            
          </a>{' '}
          
        </p>
        <ul className="foot__legal meta">
          <li>
            <a href="/#about">Privacy</a>
          </li>
          <li>
            <a href="/#about">Terms</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
