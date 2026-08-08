import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import FarmSection from "../components/home/FarmSection";
import ProductsPreview from "../components/home/ProductsPreview";
import VideosPreview from "../components/home/VideosPreview";
import ContactCTA from "../components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />

      <About />

      <Services />

      <FarmSection />

      <ProductsPreview />

      <VideosPreview />

      <ContactCTA />
    </main>
  );
}
