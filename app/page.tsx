// Notice: NO curly braces around the component names!
import Hero from "@/components/Hero"; // Assuming you have a Hero component here
import Services from "@/components/Services";
import Works from "@/components/Works";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    // The bg-[#efeee9] sets the base light color for the Hero and Contact sections
    <main className="w-full min-h-screen bg-[#efeee9]">
      <Hero />
      <Services />
      <Works />
      <About />
      <Contact />
      <Footer />
      <Navigation />
    </main>
  );
}