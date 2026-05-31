import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer.jsx";

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-[var(--color-border)] text-text hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-xl"
          >
            ×
          </button>

          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
            <div className="relative aspect-video bg-black border border-[var(--color-border)]">
              {project.videoSrc ? (
                <VideoPlayer
                  src={project.videoSrc}
                  poster={project.poster}
                  autoPlay
                  controls
                  preload="auto"
                  className="absolute inset-0 w-full h-full"
                />
              ) : project.vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&color=C8FF00&title=0&byline=0&portrait=0`}
                  title={project.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${project.ytId}?autoplay=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{project.category}</p>
                <h3 className="font-syne font-extrabold text-2xl md:text-3xl mt-2">
                  {project.title}
                </h3>
              </div>
              <p className="text-muted text-xs hidden md:block">ESC to close</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
