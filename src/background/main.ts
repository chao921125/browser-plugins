import browser from "webextension-polyfill";

// 使用统一API
browser.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});
