import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Services from '../components/Services.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Pricing from '../components/Pricing.jsx';
import Process from '../components/Process.jsx';
import Faq from '../components/Faq.jsx';
import BriefCallout from '../components/BriefCallout.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <Faq />
        <BriefCallout />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
