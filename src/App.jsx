import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CursorDot from "./components/CursorDot.jsx";
import Section from "./components/Section.jsx";
import ProductGallery from "./components/ProductGallery.jsx";
import ProductInfo from "./components/ProductInfo.jsx";
import FeatureList from "./components/FeatureList.jsx";
import ReviewList from "./components/ReviewList.jsx";
import ProductList from "./components/ProductList.jsx";
import CartPanel from "./components/CartPanel.jsx";
import { products, sizes, features, reviews, FREE_SHIPPING_MIN } from "./data/products.js";
import { colors, container, fontFamily, rupiah, space, themes, themeVars, typography } from "./styles.js";

// Nyimpen Pilihan Product
const getInitialTheme = () => {
  const saved = localStorage.getItem("sockTheme");
  if (saved in themes) return saved;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang";
};

const NAV_LINKS = [
  { href: "#produk", label: "Produk" },
  { href: "#detail", label: "Detail" },
  { href: "#ulasan", label: "Ulasan" },
  { href: "#rekomendasi", label: "Rekomendasi" },
];

const styles = {
  page: (theme) => ({
    ...themeVars(theme), 
    minHeight: "100vh",
    background: colors.bg,
    color: colors.text,
    fontFamily,
    transition: "background 0.4s, color 0.4s",
  }),
  hero: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: space.xl },
  footer: { ...typography.small, textAlign: "center", padding: space.lg },
  cartWrap: { ...container, paddingTop: space.xl, paddingBottom: space.xl },
};
// Bikin Terang Gelap
function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("sockTheme", theme);
    
    document.body.style.background = themes[theme].bg;
    
    document.documentElement.style.colorScheme = theme === "gelap" ? "dark" : "light";
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "terang" ? "gelap" : "terang"));

  const [selectedId, setSelectedId] = useState(products[0].id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState({}); // key "productId|size" -> jumlah
  const [message, setMessage] = useState({ text: "", type: "success" });

  const product = products.find((p) => p.id === selectedId);

  const remainingFor = (p, size) => p.stock[size] - (cart[`${p.id}|${size}`] || 0);
  const remaining = selectedSize ? remainingFor(product, selectedSize) : 0;

  const cartItems = Object.entries(cart).map(([key, qty]) => {
    const [id, size] = key.split("|");
    const p = products.find((item) => item.id === Number(id));
    return { key, qty, subtotal: p.price * qty, label: `${p.name} — Ukuran ${size} — ${qty} unit × ${rupiah(p.price)} = ${rupiah(p.price * qty)}` };
  });
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.subtotal, 0);
  const shipRemaining = Math.max(FREE_SHIPPING_MIN - totalPrice, 0);

  const resetMessage = () => setMessage({ text: "", type: "success" });

  const handleColor = (id) => {
    setSelectedId(id);
    setQuantity(1);
    resetMessage();
    
    const next = products.find((p) => p.id === id);
    if (selectedSize && remainingFor(next, selectedSize) <= 0) setSelectedSize(null);
  };

  const handleSize = (size) => {
    setSelectedSize(size);
    setQuantity(1);
    resetMessage();
  };

  const handleQuantity = (value) => {
    if (!selectedSize) return;
    setQuantity(Math.min(Math.max(value, 1), Math.max(remaining, 1)));
    resetMessage();
  };

  const handleAdd = () => {
    const key = `${product.id}|${selectedSize}`;
    setCart({ ...cart, [key]: (cart[key] || 0) + quantity });
    setMessage({ text: `${quantity} unit ${product.name} ukuran ${selectedSize} berhasil ditambahkan.`, type: "success" });
    setQuantity(1);
  };

  const handlePick = (id) => {
    handleColor(id);
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page(theme)}>
      <CursorDot />
      <Header brand="Sock" links={NAV_LINKS} cartCount={totalItems} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Section id="produk">
          <div style={styles.hero}>
            <ProductGallery products={products} selectedId={selectedId} onSelect={handleColor} />
            <ProductInfo
              title="Kaos Kaki Premium Combed"
              product={product}
              products={products}
              sizes={sizes}
              selectedSize={selectedSize}
              quantity={quantity}
              remaining={remaining}
              subtotal={selectedSize && remaining > 0 ? product.price * quantity : 0}
              message={message}
              shippingText={
                shipRemaining > 0
                  ? `Belanja ${rupiah(shipRemaining)} lagi buat gratis ongkir`
                  : "Selamat! Kamu dapat gratis ongkir 🎉"
              }
              shippingPercent={Math.min((totalPrice / FREE_SHIPPING_MIN) * 100, 100)}
              onColor={handleColor}
              onSize={handleSize}
              onQuantity={handleQuantity}
              onAdd={handleAdd}
              getRemaining={(size) => remainingFor(product, size)}
            />
          </div>
        </Section>

        <Section id="detail" title="Kenapa Kaos Kaki Ini?">
          <FeatureList items={features} />
        </Section>

        <Section id="ulasan" title="Kata Mereka">
          <ReviewList reviews={reviews} />
        </Section>

        <Section id="rekomendasi" title="Rekomendasi Warna">
          <ProductList products={products} onPick={handlePick} />
        </Section>

        <Section id="keranjang">
          <CartPanel items={cartItems} totalItems={totalItems} totalPrice={totalPrice} />
        </Section>
      </main>

      <footer style={styles.footer}>© 2026 Sock Store</footer>
    </div>
  );
}

export default App;
