import { useState } from "react";
import { colors, container, space } from "../styles.js";
import logo from "../../LogoSockStore.png";

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: colors.bg,
    borderBottom: `1px solid ${colors.line}`,
    padding: `${space.md}px 0`,
  },
  inner: {
    ...container,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
  },
  brand: { display: "flex", alignItems: "center", gap: space.sm, textDecoration: "none", color: colors.text, fontSize: 22 },
  logo: { width: 36, height: 36, objectFit: "contain", borderRadius: 8 },
  brandStrong: { color: colors.orange, fontWeight: 800 },
  nav: { display: "flex", gap: space.sm, flexWrap: "wrap" },
  
 
  link: (active) => ({
    color: colors.text,
    textDecoration: "none",
    fontWeight: 600,
    padding: `${space.sm}px ${space.md}px`,
    borderRadius: 999,
    background: active ? colors.navActive : "transparent",
    transition: "background 0.2s",
  }),
  actions: { display: "flex", alignItems: "center", gap: space.sm },
  themeBtn: {
    padding: `${space.sm}px ${space.md}px`,
    borderRadius: 999,
    border: `1px solid ${colors.line}`,
    background: colors.surface,
    color: colors.text,
    font: "inherit",
    cursor: "pointer",
  },
  cart: {
    display: "inline-flex",
    alignItems: "center",
    gap: space.sm,
    padding: `${space.sm}px ${space.md}px`,
    borderRadius: 999,
    border: `1px solid ${colors.line}`,
    background: colors.surface,
    color: colors.text,
    textDecoration: "none",
  },
  badge: {
    minWidth: 22,
    height: 22,
    padding: "0 6px",
    boxSizing: "border-box",
    display: "inline-grid",
    placeItems: "center",
    borderRadius: 999,
    background: colors.orange,
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },
};


function Header({ brand, links, cartCount, theme, onToggleTheme }) {
  const isGelap = theme === "gelap";
  const [activeLink, setActiveLink] = useState(null); // href menu yang terakhir diklik
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <a href="#produk" style={styles.brand}>
          <img src={logo} alt="Logo Sock Store" style={styles.logo} />
          <span>
            <strong style={styles.brandStrong}>{brand}</strong> Store
          </span>
        </a>
        <nav style={styles.nav} aria-label="Navigasi utama">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={styles.link(link.href === activeLink)}
              aria-current={link.href === activeLink ? "true" : undefined}
              onClick={() => setActiveLink(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={styles.actions}>
          <button
            type="button"
            style={styles.themeBtn}
            onClick={onToggleTheme}
            aria-pressed={isGelap}
            aria-label={isGelap ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
          >
            {isGelap ? "☀️ Terang" : "🌙 Gelap"}
          </button>
          <a href="#keranjang" style={styles.cart} aria-label="Lihat keranjang">
            🛍️ <span style={styles.badge}>{cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
