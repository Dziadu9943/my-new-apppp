// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Enable Nitro with the Netlify preset when building outside Lovable's sandbox (i.e., on Netlify CI).
  // Inside Lovable, the preset is always forced to cloudflare-module and this setting is ignored.
  nitro: { preset: "netlify" },
  // Dodatkowa konfiguracja Vite wskazująca na Twój nowy folder audio zamiast zablokowanego public
  vite: {
    publicDir: "assets-audio",
  },
});
