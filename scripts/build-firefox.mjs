import webExt from "web-ext";

webExt.cmd.build(
	{
		sourceDir: "dist",
		artifactsDir: "web-ext-artifacts",
		filename: "extension.xpi",
	},
	{ shouldExitProgram: false },
);
