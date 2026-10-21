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
  // `ready` flips while the loader's doors are still opening, so the hero's
  // headline rises into the gap; the loader itself unmounts a beat later.
  const [ready, setReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const { pathname, hash } = useLocation();

  useSmoothScroll(ready);

  const onLoaderReveal = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);
  const onLoaderDone = useCallback(() => setLoaderGone(true), []);

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
      {!loaderGone && <Loader onReveal={onLoaderReveal} onDone={onLoaderDone} />}
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
