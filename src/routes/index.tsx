import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import Services from "@/components/Services.jsx";
import Portfolio from "@/components/Portfolio.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";
import Lightbox from "@/components/Lightbox.jsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [active, setActive] = useState(null);

  return (
    <main className="bg-bg text-text font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio onOpen={setActive} paused={!!active} />
      <Contact />
      <Footer />
      <Lightbox project={active} onClose={() => setActive(null)} />
    </main>
  );
}
