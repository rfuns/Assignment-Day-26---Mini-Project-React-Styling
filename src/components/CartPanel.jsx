import { card, colors, rupiah, space, typography } from "../styles.js";

const styles = {
  card: { ...card, display: "flex", flexDirection: "column", gap: space.sm },
  list: { margin: 0, padding: 0, listStyle: "none" },
  item: { ...typography.body, padding: `${space.sm}px 0`, borderBottom: `1px solid ${colors.line}` },
};


function CartPanel({ items, totalItems, totalPrice }) {
  return (
    <div style={styles.card}>
      <h3 style={typography.cardTitle}>Keranjang Belanja</h3>
      <ul style={styles.list}>
        {items.length === 0 ? (
          <li style={styles.item}>Keranjang masih kosong.</li>
        ) : (
          items.map((item) => (
            <li key={item.key} style={styles.item}>{item.label}</li>
          ))
        )}
      </ul>
      <p style={typography.body}>
        Total barang: <strong style={{ color: colors.text }}>{totalItems}</strong>
      </p>
      <p style={typography.body}>
        Total harga: <strong style={{ color: colors.text }}>{rupiah(totalPrice)}</strong>
      </p>
    </div>
  );
}

export default CartPanel;
