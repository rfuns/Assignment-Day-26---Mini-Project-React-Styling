import { useEffect, useRef } from "react";
import { colors } from "../styles.js";

function CursorDot() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return undefined;

    const handleMove = (event) => {
      const dot = ref.current;
      if (!dot) return;
      const big = Boolean(event.target.closest("button, a, input"));
      dot.style.opacity = big ? "0.35" : "0.9";
      dot.style.width = dot.style.height = big ? "36px" : "14px";
      dot.style.margin = big ? "-18px 0 0 -18px" : "-7px 0 0 -7px";
      dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    const handleLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        margin: "-7px 0 0 -7px",
        borderRadius: "50%",
        background: colors.orange,
        pointerEvents: "none",
        zIndex: 999,
        opacity: 0,
        transition: "width 0.2s, height 0.2s, margin 0.2s, opacity 0.2s",
      }}
    />
  );
}

export default CursorDot;
