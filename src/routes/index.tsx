import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import Services from "@/components/Services.jsx";
import Portfolio from "@/components/Portfolio.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";
import Lightbox from "@/components/Lightbox.jsx";
import AllProjectsDrawer from "@/components/AllProjectsDrawer.jsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  /* Re-lock body scroll when lightbox closes while drawer is still open */
  useEffect(() => {
    if (!activeVideo && drawerOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [activeVideo, drawerOpen]);

  return (
    <main className="bg-bg text-text font-sans">
      <Hero onOpen={setActive} paused={!!active} />
      <About />
      <Services />
      <Portfolio onOpenDrawer={() => setDrawerOpen(true)} />
      <Contact />
      <Footer />
      <Lightbox project={active} onClose={() => setActive(null)} />
      <AllProjectsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onVideoSelect={(video) => setActiveVideo(video)}
      />
      <Lightbox project={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}
