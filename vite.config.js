import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { readdirSync } from "fs";

const allTemplateDirectories = [];

const getDirectories = (source, result) => {
  const dir = readdirSync(source, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory()
  );

  dir.forEach((d) => {
    result.push(resolve(__dirname, source, d.name));
    getDirectories(`${source}/${d.name}`, result);
  });
};

getDirectories(resolve(__dirname, "src/partials"), allTemplateDirectories);

export default defineConfig({
  server: { port: 3000 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        400: resolve(__dirname, "src/pages/400/400.html"),
        500: resolve(__dirname, "src/pages/500/500.html"),
        login: resolve(__dirname, "src/pages/login/login.html"),
        profile: resolve(__dirname, "src/pages/profile/profile.html"),
        register: resolve(__dirname, "src/pages/register/register.html"),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: allTemplateDirectories,
    }),
  ],
});
