import {getStorageKey, getVersion} from "../src/helpers"

test("getStorageKey", () => {
	expect(getStorageKey("prefix_", "en", "common")).toEqual("prefix_en-common");
});

test("getVersion", () => {
	const version = "hello";

	expect(getVersion({versions: {en: version}}, "en")).toEqual(version);
});

test("getVersion - default", () => {
	const version = "hello";

	expect(getVersion({versions: {}, defaultVersion: version}, "en")).toEqual(version);
});
