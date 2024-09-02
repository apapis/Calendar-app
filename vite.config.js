import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // zmienia katalog wyjściowy na 'build' zamiast domyślnego 'dist'
    minify: "terser", // używa Terser do minifikacji
    sourcemap: true, // generuje source maps dla debugowania
  },
});
