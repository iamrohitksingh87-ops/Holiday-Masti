import { HolidayCursor } from './components/hero/HolidayCursor';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/navigation/Nav';
import { Footer } from './components/footer/Footer';
import { Loader } from './components/loader/Loader';
import { Home } from './pages/Home';
import { FlightsPage } from './pages/FlightsPage';
import { TrainsPage } from './pages/TrainsPage';
import { JourneyPage } from './pages/JourneyPage';
import { NotFound } from './pages/NotFound';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { ScrollTrigger } from './lib/motion';

export function App() {
  const [ready, setReady] = useState(false);
  const { pathname, hash } = useLocation();

  useSmoothScroll(ready);

  const onLoaderDone = useCallback(() => {
    setReady(true);
    // Layout has settled and the loader no longer occupies the viewport.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  // New page, top of page. In-page anchors keep their own behaviour.
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    if (!ready || !hash) return;
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [ready, hash]);

  return (
    <>
      {!ready && <Loader onDone={onLoaderDone} />}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <HolidayCursor />
      <main id="main">
        <Routes>
  <Route path="/" element={<Home ready={ready} />} />
  <Route path="/flights" element={<FlightsPage />} />
  <Route path="/trains" element={<TrainsPage />} />
  <Route path="/journeys/:slug" element={<JourneyPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </main>
      <Footer />
    </>
  );
}
