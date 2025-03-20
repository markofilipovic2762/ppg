import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: "./key.pem",
  //     cert: "./cert.pem",
  //   }
  // },
  base: "/potrosnjagoriva/",
  plugins: [react(), tailwindcss()],
});
