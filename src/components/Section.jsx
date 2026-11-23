import { container, space, typography } from "../styles.js";

const styles = {
  section: { ...container, paddingTop: space.xl, paddingBottom: space.xl },
  title: { ...typography.sectionTitle, marginBottom: space.lg },
};


function Section({ id, title, children }) {
  return (
    <section id={id} style={styles.section}>
      {title && <h2 style={styles.title}>{title}</h2>}
      {children}
    </section>
  );
}

export default Section;
