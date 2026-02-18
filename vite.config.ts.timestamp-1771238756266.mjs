// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Neeraj%20system%20folder/bhel-new-dpr/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Neeraj%20system%20folder/bhel-new-dpr/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import rollupNodePolyFill from "file:///D:/Neeraj%20system%20folder/bhel-new-dpr/node_modules/rollup-plugin-node-polyfills/dist/index.js";
import { NodeGlobalsPolyfillPlugin } from "file:///D:/Neeraj%20system%20folder/bhel-new-dpr/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import fs from "fs";
import svgr from "file:///D:/Neeraj%20system%20folder/bhel-new-dpr/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Neeraj system folder\\bhel-new-dpr";
var replace = (val) => {
  return val.replace(/^~/, "");
};
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: process.env.VITE_BASE_URL || "/",
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          titleProp: false
        }
      })
    ],
    define: {
      global: "globalThis"
    },
    server: {
      port: 3e3,
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "PATCH", "PUT", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["node_modules", "./src/assets"]
        }
      }
      // postcss: {
      //   plugins: [require("postcss-rtl")()],
      // },
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          // replacement: '',
          replacement: replace
        },
        {
          find: "stream",
          replacement: "stream-browserify"
        },
        { find: "stream", replacement: "stream-browserify" },
        { find: "crypto", replacement: "crypto-browserify" },
        { find: "@src", replacement: path.resolve(__vite_injected_original_dirname, "src") },
        { find: "@store", replacement: path.resolve(__vite_injected_original_dirname, "src/redux") },
        { find: "@configs", replacement: path.resolve(__vite_injected_original_dirname, "src/configs") },
        {
          find: "url",
          replacement: "rollup-plugin-node-polyfills/polyfills/url"
        },
        {
          find: "@styles",
          replacement: path.resolve(__vite_injected_original_dirname, "src/@core/scss")
        },
        {
          find: "util",
          replacement: "rollup-plugin-node-polyfills/polyfills/util"
        },
        {
          find: "zlib",
          replacement: "rollup-plugin-node-polyfills/polyfills/zlib"
        },
        {
          find: "@utils",
          replacement: path.resolve(__vite_injected_original_dirname, "src/utility/Utils")
        },
        {
          find: "@hooks",
          replacement: path.resolve(__vite_injected_original_dirname, "src/utility/hooks")
        },
        {
          find: "@assets",
          replacement: path.resolve(__vite_injected_original_dirname, "src/@core/assets")
        },
        {
          find: "@@assets",
          replacement: path.resolve(__vite_injected_original_dirname, "src/assets")
        },
        {
          find: "@layouts",
          replacement: path.resolve(__vite_injected_original_dirname, "src/@core/layouts")
        },
        {
          find: "assert",
          replacement: "rollup-plugin-node-polyfills/polyfills/assert"
        },
        {
          find: "buffer",
          replacement: "rollup-plugin-node-polyfills/polyfills/buffer-es6"
        },
        {
          find: "process",
          replacement: "rollup-plugin-node-polyfills/polyfills/process-es6"
        },
        {
          find: "@components",
          replacement: path.resolve(__vite_injected_original_dirname, "src/@core/components")
        },
        {
          find: "@@components",
          replacement: path.resolve(__vite_injected_original_dirname, "src/views/components")
        },
        {
          find: "@modules",
          replacement: path.resolve(__vite_injected_original_dirname, "src/modules")
        }
      ]
    },
    //   esbuild: {
    //     // loader: 'jsx',
    //     // include: /.\/src\/.*\.js?$/,
    //     // exclude: [],
    //     jsx: 'automatic'
    //   },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx"
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          }),
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                loader: "jsx",
                contents: await fs.readFileSync(args.path, "utf8")
              }));
            }
          }
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()]
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxOZWVyYWogc3lzdGVtIGZvbGRlclxcXFxiaGVsLW5ldy1kcHJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE5lZXJhaiBzeXN0ZW0gZm9sZGVyXFxcXGJoZWwtbmV3LWRwclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTmVlcmFqJTIwc3lzdGVtJTIwZm9sZGVyL2JoZWwtbmV3LWRwci92aXRlLmNvbmZpZy50c1wiOy8qKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHJvbGx1cE5vZGVQb2x5RmlsbCBmcm9tICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzJ1xyXG5pbXBvcnQgeyBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLWdsb2JhbHMtcG9seWZpbGwnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcclxuXHJcbmNvbnN0IHJlcGxhY2U6IGFueSA9ICh2YWwpID0+IHtcclxuICByZXR1cm4gdmFsLnJlcGxhY2UoL15+LywgJycpXHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xyXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9XHJcblxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogcHJvY2Vzcy5lbnYuVklURV9CQVNFX1VSTCB8fCAnLycsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIHN2Z3Ioe1xyXG4gICAgICAgIHN2Z3JPcHRpb25zOiB7XHJcbiAgICAgICAgICB0aXRsZVByb3A6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBnbG9iYWw6ICdnbG9iYWxUaGlzJ1xyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICBjb3JzOiB7XHJcbiAgICAgICAgb3JpZ2luOiBbJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCddLFxyXG4gICAgICAgIG1ldGhvZHM6IFsnR0VUJywgJ1BBVENIJywgJ1BVVCcsICdQT1NUJywgJ0RFTEVURScsICdPUFRJT05TJ10sXHJcbiAgICAgICAgYWxsb3dlZEhlYWRlcnM6IFsnQ29udGVudC1UeXBlJywgJ0F1dGhvcml6YXRpb24nLCAnWC1SZXF1ZXN0ZWQtV2l0aCddXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGluY2x1ZGVQYXRoczogWydub2RlX21vZHVsZXMnLCAnLi9zcmMvYXNzZXRzJ11cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gcG9zdGNzczoge1xyXG4gICAgICAvLyAgIHBsdWdpbnM6IFtyZXF1aXJlKFwicG9zdGNzcy1ydGxcIikoKV0sXHJcbiAgICAgIC8vIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6IC9efi4rLyxcclxuICAgICAgICAgIC8vIHJlcGxhY2VtZW50OiAnJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiByZXBsYWNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnc3RyZWFtJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnc3RyZWFtLWJyb3dzZXJpZnknXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IGZpbmQ6ICdzdHJlYW0nLCByZXBsYWNlbWVudDogJ3N0cmVhbS1icm93c2VyaWZ5JyB9LFxyXG4gICAgICAgIHsgZmluZDogJ2NyeXB0bycsIHJlcGxhY2VtZW50OiAnY3J5cHRvLWJyb3dzZXJpZnknIH0sXHJcbiAgICAgICAgeyBmaW5kOiAnQHNyYycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcclxuICAgICAgICB7IGZpbmQ6ICdAc3RvcmUnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9yZWR1eCcpIH0sXHJcbiAgICAgICAgeyBmaW5kOiAnQGNvbmZpZ3MnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb25maWdzJykgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAndXJsJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvdXJsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ0BzdHlsZXMnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvQGNvcmUvc2NzcycpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAndXRpbCcsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3V0aWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnemxpYicsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3psaWInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQHV0aWxzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxpdHkvVXRpbHMnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ0Bob29rcycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlsaXR5L2hvb2tzJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdAYXNzZXRzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL0Bjb3JlL2Fzc2V0cycpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQEBhc3NldHMnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdAbGF5b3V0cycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9AY29yZS9sYXlvdXRzJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdhc3NlcnQnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9hc3NlcnQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnYnVmZmVyJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvYnVmZmVyLWVzNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdwcm9jZXNzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvcHJvY2Vzcy1lczYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQGNvbXBvbmVudHMnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvQGNvcmUvY29tcG9uZW50cycpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQEBjb21wb25lbnRzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3ZpZXdzL2NvbXBvbmVudHMnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ0Btb2R1bGVzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL21vZHVsZXMnKVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIC8vICAgZXNidWlsZDoge1xyXG4gICAgLy8gICAgIC8vIGxvYWRlcjogJ2pzeCcsXHJcbiAgICAvLyAgICAgLy8gaW5jbHVkZTogLy5cXC9zcmNcXC8uKlxcLmpzPyQvLFxyXG4gICAgLy8gICAgIC8vIGV4Y2x1ZGU6IFtdLFxyXG4gICAgLy8gICAgIGpzeDogJ2F1dG9tYXRpYydcclxuICAgIC8vICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgIGxvYWRlcjoge1xyXG4gICAgICAgICAgJy5qcyc6ICdqc3gnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luKHtcclxuICAgICAgICAgICAgYnVmZmVyOiB0cnVlLFxyXG4gICAgICAgICAgICBwcm9jZXNzOiB0cnVlXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2xvYWQtanMtZmlsZXMtYXMtanN4JyxcclxuICAgICAgICAgICAgc2V0dXAoYnVpbGQpIHtcclxuICAgICAgICAgICAgICBidWlsZC5vbkxvYWQoeyBmaWx0ZXI6IC9zcmNcXFxcLipcXC5qcyQvIH0sIGFzeW5jIChhcmdzKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAnanN4JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBhd2FpdCBmcy5yZWFkRmlsZVN5bmMoYXJncy5wYXRoLCAndXRmOCcpXHJcbiAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgcGx1Z2luczogW3JvbGx1cE5vZGVQb2x5RmlsbCgpXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLHdCQUF3QjtBQUMvQixTQUFTLGlDQUFpQztBQUMxQyxPQUFPLFFBQVE7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
