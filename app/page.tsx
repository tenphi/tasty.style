import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TokenShowcase from './components/TokenShowcase';
import CodeShowcase from './components/CodeShowcase';
import Ecosystem from './components/Ecosystem';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import SectionWrap from './ui/SectionWrap';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionWrap fill="#primary-surface-2">
          <Features />
        </SectionWrap>
        <HowItWorks />
        <TokenShowcase />
        <CodeShowcase />
        <SectionWrap fill="#primary-surface-2">
          <Ecosystem />
        </SectionWrap>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
