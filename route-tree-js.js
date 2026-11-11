import fs from "node:fs";

/**
 * TanStack Start always adds a short TypeScript-only block (type registration) to the end of
 * the generated route list, even in plain JavaScript projects. This small Vite plugin drops
 * that block whenever src/routeTree.gen.js is loaded, so the site runs as plain JavaScript.
 * You never need to edit this file or the generated route list.
 */
export function routeTreeJs() {
  return {
    name: "route-tree-js",
    enforce: "pre",
    load(id) {
      const file = id.split("?")[0].replace(/\\/g, "/");
      if (!file.endsWith("/src/routeTree.gen.js") || !fs.existsSync(file)) return null;
      const code = fs.readFileSync(file, "utf8");
      const typesStart = code.search(/^import type /m);
      if (typesStart === -1) return null;
      return { code: code.slice(0, typesStart), map: null };
    },
  };
}
