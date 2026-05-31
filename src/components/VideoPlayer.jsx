import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({
  src,
  poster,
  className = "",
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  playsInline = true,
  preload = "metadata",
  onLoadedMetadata,
  onClick,
}) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handleLoaded = () => setLoaded(true);
    el.addEventListener("loadeddata", handleLoaded);
    return () => el.removeEventListener("loadeddata", handleLoaded);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {/* Poster fallback shown until video loads */}
      {poster && !loaded && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        preload={preload}
        onLoadedMetadata={onLoadedMetadata}
        onClick={onClick}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
