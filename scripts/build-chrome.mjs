const fs = require("fs-extra");
const CRX = require("crx");

async function build() {
	const crx = new CRX({
		codebase: "https://your-domain.com/extension.crx",
		privateKey: fs.readFileSync("key.pem"),
	});

	await crx.load("dist");
	const buffer = await crx.pack();
	fs.writeFileSync("extension.crx", buffer);
}

build();
