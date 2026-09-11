import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="section on-dark" style={{ minHeight: '78vh', display: 'grid', placeItems: 'center' }}>
      <div className="shell" style={{ textAlign: 'center' }}>
        <p className="meta">Error 404</p>
        <h1 className="display" style={{ fontSize: 'var(--t-display)', margin: '1rem 0 1.5rem' }}>
          Took the <span className="italic">long way</span>.
        </h1>
        <p className="lead" style={{ margin: '0 auto 2.5rem', maxWidth: '38ch' }}>
          This page isn’t on the itinerary. The rest of India still is.
        </p>
        <Link className="cta cta--solid" to="/">
          Back to the beginning <span className="cta__arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
