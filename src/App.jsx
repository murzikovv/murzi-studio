import { useLenis } from './lib/useLenis.js';
import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Pricing from './components/Pricing.jsx';
import Process from './components/Process.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useLenis();
  return (
    <div className="grain min-h-screen">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
