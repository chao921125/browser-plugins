import fs from "fs";
import path from "path";

const browsers = ["chrome", "firefox"];

browsers.forEach((browser) => {
	const baseManifest = {
		manifest_version: browser === "chrome" ? 3 : 2,
		name: "My Extension",
		version: "1.0.0",
		// 公共配置...
	};

	// 浏览器特定配置
	if (browser === "firefox") {
		baseManifest.browser_specific_settings = {
			gecko: {
				id: "your-id@domain",
			},
		};
	}

	fs.writeFileSync(path.join(__dirname, `../manifest/${browser}.json`), JSON.stringify(baseManifest, null, 2));
});
