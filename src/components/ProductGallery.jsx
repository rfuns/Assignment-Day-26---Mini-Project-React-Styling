import { useEffect, useRef, useState } from "react";
import { colors, shadow, space, typography } from "../styles.js";

const LENS_ZOOM = 2.6; // Agar bisa diperbesar
const LENS_SIZE = 160;
const SWAP_MS = 220;

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;


const KEYFRAMES = "@keyframes sockFloat { 50% { transform: translateY(-10px); } }";

const styles = {
  stage: (hover) => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: 28,
    background: colors.surface,
    boxShadow: shadow,
    minHeight: 460,
    padding: space.lg,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    perspective: 900,
    cursor: hover ? "none" : "default",
  }),
  glow: (x, y, color) => ({
    position: "absolute",
    width: 520,
    height: 520,
    left: `${x}%`,
    top: `${y}%`,
    transform: "translate(-50%, -50%)",
    background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    pointerEvents: "none",
    transition: "left 0.15s ease-out, top 0.15s ease-out, background 0.4s",
  }),
  item: (tilt, animate) => ({
    position: "relative",
    width: 260,
    height: 260,
    transformStyle: "preserve-3d",
    transition: "transform 0.25s ease-out",
    animation: animate ? "sockFloat 4s ease-in-out infinite" : "none",
    transform: tilt
      ? `rotateY(${tilt.x * 16}deg) rotateX(${-tilt.y * 16}deg) scale(1.04)`
      : undefined,
  }),
  image: (swapping) => ({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0 24px 22px rgba(0,0,0,0.25))",
    opacity: swapping ? 0 : 1,
    transform: swapping ? "scale(0.85) rotate(-6deg)" : "none",
    transition: "opacity 0.25s, transform 0.35s",
  }),
  lens: (lens) => ({
    position: "absolute",
    left: lens.x - LENS_SIZE / 2,
    top: lens.y - LENS_SIZE / 2,
    width: LENS_SIZE,
    height: LENS_SIZE,
    borderRadius: "50%",
    overflow: "hidden",
    zIndex: 5,
    background: colors.surface,
    border: `4px solid ${colors.surface}`,
    boxShadow: `0 0 0 2px ${colors.orange}, 0 14px 30px rgba(0,0,0,0.3)`,
    pointerEvents: "none",
    opacity: lens.on ? 1 : 0,
    transform: lens.on ? "scale(1)" : "scale(0.6)",
    transition: "opacity 0.2s, transform 0.2s",
  }),
  lensImage: (lens) => ({
    position: "absolute",
    maxWidth: "none",
    objectFit: "contain",
    width: lens.boxW * LENS_ZOOM,
    height: lens.boxH * LENS_ZOOM,
    left: LENS_SIZE / 2 - lens.px * LENS_ZOOM,
    top: LENS_SIZE / 2 - lens.py * LENS_ZOOM,
  }),
  name: { ...typography.cardTitle, position: "relative", marginTop: space.md },
  hint: { ...typography.small, position: "relative", marginTop: space.xs, marginBottom: space.md },
  thumbs: { position: "relative", display: "flex", gap: space.md },
  thumb: (active) => ({
    width: 64,
    height: 64,
    padding: 6,
    cursor: "pointer",
    border: `3px solid ${active ? colors.orange : colors.line}`,
    borderRadius: 14,
    background: colors.bg,
  }),
  thumbImg: { width: "100%", height: "100%", objectFit: "contain" },
};

const LENS_OFF = { on: false, x: 0, y: 0, px: 0, py: 0, boxW: 0, boxH: 0 };

// Bikin products (array), selectedId (number), onSelect (function).
function ProductGallery({ products, selectedId, onSelect }) {
  const stageRef = useRef(null);
  const itemRef = useRef(null);

  const [shownId, setShownId] = useState(selectedId); // gambar yang sedang tampil
  const [swapping, setSwapping] = useState(false);
  const [tilt, setTilt] = useState(null); // {x, y} -0.5..0.5, null = tidak hover
  const [glow, setGlow] = useState({ x: 50, y: 45 });
  const [lens, setLens] = useState(LENS_OFF);

  // Ganti-ganti Gambar saat dipilih warna-nya
  useEffect(() => {
    if (selectedId === shownId) return undefined;
    if (reduceMotion()) {
      setShownId(selectedId);
      return undefined;
    }
    setSwapping(true);
    const timer = setTimeout(() => {
      setShownId(selectedId);
      setSwapping(false);
    }, SWAP_MS);
    return () => clearTimeout(timer);
  }, [selectedId, shownId]);

  const shown = products.find((p) => p.id === shownId);
  const selected = products.find((p) => p.id === selectedId);

  // bikin 3D, dan bisa diperbesar gambarnya
  const handleMove = (event) => {
    const stage = stageRef.current.getBoundingClientRect();
    const item = itemRef.current.getBoundingClientRect();
    const sx = event.clientX - stage.left;
    const sy = event.clientY - stage.top;
    const x = sx / stage.width - 0.5;
    const y = sy / stage.height - 0.5;

    setTilt({ x, y });
    setGlow({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });

    // Kursur dapat mengikuti Ukuran Gambar yang ada
    const boxW = itemRef.current.offsetWidth;
    const boxH = itemRef.current.offsetHeight;
    const px = event.clientX - (item.left + item.width / 2) + boxW / 2;
    const py = event.clientY - (item.top + item.height / 2) + boxH / 2;
    const inside = px >= 0 && py >= 0 && px <= boxW && py <= boxH;
    setLens({ on: inside, x: sx, y: sy, px, py, boxW, boxH });
  };

  const handleLeave = () => {
    setTilt(null);
    setGlow({ x: 50, y: 45 });
    setLens((prev) => ({ ...prev, on: false }));
  };

  const animate = !reduceMotion() && tilt === null;
  const glowColor = `color-mix(in srgb, ${selected.swatch} 35%, transparent)`;

  return (
    <div ref={stageRef} style={styles.stage(tilt !== null)} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <style>{KEYFRAMES}</style>
      <div style={styles.glow(glow.x, glow.y, glowColor)} />

      <div ref={itemRef} style={styles.item(tilt, animate)}>
        <img src={shown.image} alt={shown.title} style={styles.image(swapping)} />
      </div>

      <div style={styles.lens(lens)} aria-hidden="true">
        <img src={shown.image} alt="" style={styles.lensImage(lens)} />
      </div>

      <p style={styles.name}>{selected.name}</p>
      <p style={styles.hint}>Gerakkan mouse di atas kaos kaki ✨</p>

      <div style={styles.thumbs}>
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            style={styles.thumb(product.id === selectedId)}
            onClick={() => onSelect(product.id)}
            aria-label={`Lihat ${product.title}`}
          >
            <img src={product.image} alt={`Thumbnail ${product.title}`} style={styles.thumbImg} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
