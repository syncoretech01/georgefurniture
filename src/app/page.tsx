import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Hero } from "@/components/sections/Hero";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { QuoteForm } from "@/components/sections/QuoteForm";

export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ServicesMarquee />
        <Services />
        <Process />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <ServiceArea />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCtaBar />
    </div>
  );
}
