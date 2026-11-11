// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { routeTreeJs } from "./route-tree-js.js";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Plain JavaScript project: generate the route list as src/routeTree.gen.js (no types).
    // The path is relative to the src folder.
    router: {
      generatedRouteTree: "routeTree.gen.js",
      disableTypes: true,
    },
  },
  vite: {
    plugins: [routeTreeJs()],
    // The dependency scanner at dev start-up needs the same fix.
    optimizeDeps: { rolldownOptions: { plugins: [routeTreeJs()] } },
  },
});
