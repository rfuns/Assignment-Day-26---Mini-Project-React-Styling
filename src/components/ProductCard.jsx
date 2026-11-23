import { card, colors, rupiah, space, typography } from "../styles.js";

const styles = {
  card: { ...card, display: "flex", flexDirection: "column", gap: space.sm, textAlign: "left", cursor: "pointer", font: "inherit" },
  image: { width: "100%", height: 180, objectFit: "contain" },
  price: { ...typography.price, fontSize: 18, color: colors.orange, marginTop: space.sm },
};


function ProductCard({ name, price, image, description, onPick }) {
  return (
    <button type="button" style={styles.card} onClick={onPick}>
      <img src={image} alt={`Kaos Kaki ${name}`} style={styles.image} />
      <h3 style={typography.cardTitle}>{name}</h3>
      <p style={typography.body}>{description}</p>
      <p style={styles.price}>{rupiah(price)}</p>
    </button>
  );
}

export default ProductCard;
