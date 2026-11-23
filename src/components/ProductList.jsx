import ProductCard from "./ProductCard.jsx";
import { space } from "../styles.js";

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: space.lg },
};

// Menerima array dari produk induk, kemudian kirim data ke ProductCard.
function ProductList({ products, onPick }) {
  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          onPick={() => onPick(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
