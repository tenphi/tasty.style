import Header from './components/Header';
import Hero from './components/Hero';
import StateResolverSection from './components/StateResolverSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TokenShowcase from './components/TokenShowcase';
import CodeShowcase from './components/CodeShowcase';
import Ecosystem from './components/Ecosystem';
import InTheWild from './components/InTheWild';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StateResolverSection />
        <Features />
        <HowItWorks />
        <TokenShowcase />
        <CodeShowcase />
        <Ecosystem />
        <InTheWild />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
