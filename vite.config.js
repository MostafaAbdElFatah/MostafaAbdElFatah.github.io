import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const pagePath = fileURLToPath(new URL('./src/pages/index.html', import.meta.url));
const docsDir = fileURLToPath(new URL('./src/assets/docs/', import.meta.url));

/**
 * Documents (the CV) live in src/assets/docs so the source path works on any
 * static server and in `vite dev`. Vite does not rewrite <a href>, so for the
 * build we copy each file to a stable, unhashed /docs/<name> and point the
 * HTML links there.
 */
function staticDocs() {
  return {
    name: 'static-docs',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('/src/assets/docs/', '/docs/'),
    },
    generateBundle() {
      for (const name of readdirSync(docsDir)) {
        this.emitFile({
          type: 'asset',
          fileName: `docs/${name}`,
          source: readFileSync(`${docsDir}${name}`),
        });
      }
    },
  };
}

function pagesEntry() {
  return {
    name: 'pages-entry',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url === '/' || request.url?.startsWith('/?')) {
          request.url = `/src/pages/index.html${request.url.slice(1)}`;
        }
        next();
      });
    },
    generateBundle(_options, bundle) {
      const page = Object.values(bundle).find(
        (output) => output.type === 'asset' && output.fileName.endsWith('index.html'),
      );

      if (!page) {
        throw new Error('Vite did not emit the homepage HTML entry');
      }

      if (page.fileName !== 'index.html') {
        delete bundle[page.fileName];
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: page.source,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [createHtmlPlugin({ minify: true }), pagesEntry(), staticDocs()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input: { index: pagePath } },
  },
});
