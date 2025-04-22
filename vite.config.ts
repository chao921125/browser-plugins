import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";
import webExtension from "vite-plugin-web-extension";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		webExtension({
			manifest: () => require("./manifest/chrome.json"),
			browser: process.env.TARGET || "chrome",
		}),
	],
	build: {
		rollupOptions: {
			input: {
				popup: join(__dirname, "src/popup/index.html"),
				options: join(__dirname, "src/options/index.html"),
				background: join(__dirname, "src/background/main.ts"),
				content: join(__dirname, "src/content/main.ts"),
			},
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "chunks/[name].[hash].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},
	},
});
