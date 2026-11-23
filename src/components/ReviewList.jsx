import { card, colors, space, typography } from "../styles.js";

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: space.lg },
  card: { ...card, margin: 0, display: "flex", flexDirection: "column", gap: space.md },
  author: { color: colors.orange, fontWeight: 600, fontSize: 14 },
};

// Buat Ulasan dan Rating
function ReviewCard({ quote, author, rating }) {
  return (
    <blockquote style={styles.card}>
      <p style={typography.body}>“{quote}”</p>
      <cite style={styles.author}>
        — {author} · {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </cite>
    </blockquote>
  );
}

// List Daftar Ulasan
function ReviewList({ reviews }) {
  return (
    <div style={styles.grid}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} quote={review.quote} author={review.author} rating={review.rating} />
      ))}
    </div>
  );
}

export default ReviewList;
