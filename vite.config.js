import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Index dibukan di http://localhost:5173/).
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
