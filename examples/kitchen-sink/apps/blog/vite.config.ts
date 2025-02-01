import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { khulnasoftPreset } from "@khulnasoft/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix({ presets: [khulnasoftPreset()] }), tsconfigPaths()],
});
