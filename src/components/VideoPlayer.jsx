import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({
  src,
  poster,
  style,
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
    <div style={{ position: "relative", ...style }}>
      {poster && !loaded && (
        <img
          src={poster}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
