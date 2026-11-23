// Standar warna
export const themes = {
  terang: {
    bg: "#fdf3ea",
    surface: "#ffffff",
    text: "#25252b",
    muted: "#6d6a70",
    line: "#eadfd4",
    orange: "#e8622c",
    orangeSoft: "#f4b99b",
    success: "#1b9a4d",
    error: "#d93636",
    shadow: "rgba(120, 70, 30, 0.12)",
    navActive: "rgba(0, 0, 0, 0.12)", // Jika dipilih lebih Gelap dari Background
  },
  gelap: {
    bg: "#14151a",
    surface: "#1d1f27",
    text: "#f1eee9",
    muted: "#a5a2aa",
    line: "#2f313b",
    orange: "#e8622c",
    orangeSoft: "#6b3a26",
    success: "#4cc47f",
    error: "#ff6b6b",
    shadow: "rgba(0, 0, 0, 0.5)",
    navActive: "rgba(255, 255, 255, 0.16)", // Jika dipilih lebih Terang dari Background
  },
};


export const themeVars = (name) =>
  Object.fromEntries(Object.entries(themes[name]).map(([key, value]) => [`--sock-${key}`, value]));


export const colors = Object.fromEntries(
  Object.keys(themes.terang).map((key) => [key, `var(--sock-${key})`])
);

// Judul dibuat berbeda dengan text Isinya
export const typography = {
  pageTitle: { fontSize: 40, fontWeight: 800, lineHeight: 1.15, margin: 0, color: colors.text },
  sectionTitle: { fontSize: 30, fontWeight: 700, lineHeight: 1.2, margin: 0, color: colors.text },
  cardTitle: { fontSize: 20, fontWeight: 700, margin: 0, color: colors.text },
  label: { fontSize: 15, fontWeight: 600, margin: 0, color: colors.text },
  body: { fontSize: 15, fontWeight: 400, lineHeight: 1.6, margin: 0, color: colors.muted },
  small: { fontSize: 13, fontWeight: 400, margin: 0, color: colors.muted },
  price: { fontSize: 22, fontWeight: 700, margin: 0, color: colors.text },
};

// Bikin Jarak antar Bagian sama
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 56 };

export const fontFamily = '"Segoe UI", system-ui, Arial, sans-serif';
export const shadow = "0 20px 50px var(--sock-shadow)";

// Ukuran Header, Konten, dan Footer dibuat sama
export const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: `0 ${space.lg}px`,
  boxSizing: "border-box",
};

export const card = {
  background: colors.surface,
  border: `1px solid ${colors.line}`,
  borderRadius: 20,
  padding: space.lg,
  boxShadow: shadow,
  boxSizing: "border-box",
};

export const rupiah = (number) => "Rp" + number.toLocaleString("id-ID");
