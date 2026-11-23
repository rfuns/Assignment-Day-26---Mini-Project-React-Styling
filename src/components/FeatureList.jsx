import { card, colors, space, typography } from "../styles.js";

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: space.lg },
  card: { ...card, display: "flex", flexDirection: "column", gap: space.sm },
  icon: { fontSize: 32 },
};

function FeatureCard({ icon, title, text }) {
  return (
    <article style={styles.card}>
      <span style={styles.icon}>{icon}</span>
      <h3 style={typography.cardTitle}>{title}</h3>
      <p style={typography.body}>{text}</p>
    </article>
  );
}

// Daftar kartu fitur. Props: items (array).
function FeatureList({ items }) {
  return (
    <div style={styles.grid}>
      {items.map((item) => (
        <FeatureCard key={item.id} icon={item.icon} title={item.title} text={item.text} />
      ))}
    </div>
  );
}

export default FeatureList;
