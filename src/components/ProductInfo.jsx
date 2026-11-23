import { colors, rupiah, space, typography } from "../styles.js";

const styles = {
  info: { display: "flex", flexDirection: "column", justifyContent: "center", gap: space.md },
  eyebrow: { ...typography.small, fontSize: 12, letterSpacing: "0.08em" },
  price: typography.price,
  priceUnit: { fontSize: 14, fontWeight: 400, color: colors.muted },
  row: { display: "flex", gap: space.sm, flexWrap: "wrap" },
  swatch: (color, active) => ({
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: color,
    cursor: "pointer",
    border: `3px solid ${colors.surface}`,
    boxShadow: `0 0 0 ${active ? 3 : 1}px ${active ? colors.text : colors.line}`,
  }),
  size: (active, disabled) => ({
    minWidth: 52,
    padding: "11px 16px",
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    border: `1px solid ${active ? colors.text : colors.line}`,
    borderRadius: 12,
    background: active ? colors.text : colors.surface,
    color: active ? colors.bg : colors.text,
    opacity: disabled ? 0.4 : 1,
    textDecoration: disabled ? "line-through" : "none",
  }),
  stepper: { display: "inline-flex", alignItems: "center", border: `1px solid ${colors.line}`, borderRadius: 999, background: colors.surface },
  stepBtn: { width: 42, height: 44, border: 0, background: "none", fontSize: 20, cursor: "pointer" },
  qty: { minWidth: 36, textAlign: "center", fontWeight: 700 },
  add: (disabled) => ({
    width: "100%",
    padding: 16,
    border: 0,
    borderRadius: 16,
    background: disabled ? colors.orangeSoft : colors.orange,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  message: (type) => ({ ...typography.body, minHeight: 24, color: type === "error" ? colors.error : colors.success }),
  shipBar: { height: 8, borderRadius: 99, background: colors.line, overflow: "hidden" },
  shipFill: (percent) => ({ height: "100%", width: `${percent}%`, background: colors.orange, borderRadius: 99 }),
};

// Rekap dari Product Info-nya
function ProductInfo({
  title,
  product,
  products,
  sizes,
  selectedSize,
  quantity,
  remaining,
  subtotal,
  message,
  shippingText,
  shippingPercent,
  onColor,
  onSize,
  onQuantity,
  onAdd,
  getRemaining,
}) {
  const canAdd = selectedSize !== null && remaining > 0 && quantity >= 1 && quantity <= remaining;
  const buttonText = !selectedSize ? "Pilih ukuran dulu" : remaining <= 0 ? "Stok habis" : "Tambahkan ke Keranjang";

  return (
    <div style={styles.info}>
      <p style={styles.eyebrow}>PRODUK UNGGULAN · ★ 4,8 (126 ulasan)</p>
      <h1 style={typography.pageTitle}>{title}</h1>
      <p style={styles.price}>
        {rupiah(product.price)} <span style={styles.priceUnit}>/ pasang</span>
      </p>

      <div>
        <p style={typography.label}>Warna: {product.name}</p>
        <div style={{ ...styles.row, marginTop: space.sm }} role="group" aria-label="Pilihan warna">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              style={styles.swatch(p.swatch, p.id === product.id)}
              onClick={() => onColor(p.id)}
              aria-label={p.name}
            />
          ))}
        </div>
      </div>

      <div>
        <p style={typography.label}>Ukuran: {selectedSize ?? "Belum dipilih"}</p>
        <div style={{ ...styles.row, marginTop: space.sm }} role="group" aria-label="Pilihan ukuran">
          {sizes.map((size) => {
            const disabled = getRemaining(size) <= 0;
            return (
              <button
                key={size}
                type="button"
                disabled={disabled}
                style={styles.size(size === selectedSize, disabled)}
                onClick={() => onSize(size)}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p style={{ ...typography.small, marginTop: space.sm }}>
          {selectedSize
            ? `Warna: ${product.name} | Ukuran: ${selectedSize} | Stok tersedia: ${remaining}`
            : "Silakan pilih ukuran terlebih dahulu."}
        </p>
      </div>

      <div style={styles.stepper}>
        <button type="button" style={styles.stepBtn} disabled={!selectedSize} onClick={() => onQuantity(quantity - 1)} aria-label="Kurangi jumlah">−</button>
        <span style={styles.qty}>{quantity}</span>
        <button type="button" style={styles.stepBtn} disabled={!selectedSize} onClick={() => onQuantity(quantity + 1)} aria-label="Tambah jumlah">+</button>
      </div>

      <p style={typography.body}>
        Subtotal: <strong style={{ color: colors.text }}>{rupiah(subtotal)}</strong>
      </p>

      <button type="button" style={styles.add(!canAdd)} disabled={!canAdd} onClick={onAdd}>
        {buttonText}
      </button>
      <p style={styles.message(message.type)} aria-live="polite">{message.text}</p>

      <div>
        <p style={{ ...typography.small, marginBottom: space.sm }}>{shippingText}</p>
        <div style={styles.shipBar}>
          <div style={styles.shipFill(shippingPercent)} />
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
