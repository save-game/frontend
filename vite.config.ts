import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://13.124.58.137",
  //       changeOrigin: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //       secure: false,
  //       ws: true,
  //     },
  //   },
  // },
});
