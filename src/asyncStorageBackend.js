import AsyncStorage from "@react-native-community/async-storage";
import {getStorageKey, getVersion} from "./helpers";

const defaultBackendOptions = {
	prefix: "i18next_res_",
	expirationTime: 7 * 24 * 60 * 60 * 1000,
	defaultVersion: undefined,
	versions: {},
};

function AsyncStorageBackend() {}

AsyncStorageBackend.type = "backend";

AsyncStorageBackend.prototype.init = function(services, backendOptions = {}) {
	this.options = {...defaultBackendOptions, ...backendOptions};
};

AsyncStorageBackend.prototype.read = function(language, namespace, callback) {
	const now = Date.now();
	const resource = AsyncStorage.getItem(getStorageKey(this.options.prefix, language, namespace));

	if (!resource) {
		return callback(null, null);
	}

	const version = getVersion(this.options, language);
	const parsedResource = JSON.parse(resource);

	if (parsedResource.i18nStamp && parsedResource.i18nStamp + this.options.expirationTime > now && version === parsedResource.i18nVersion) {
		delete parsedResource.i18nVersion;
		delete parsedResource.i18nStamp;

		return callback(null, parsedResource);
	}

	return callback(null, null);
};

AsyncStorageBackend.prototype.save = function(language, namespace, data) {
	data.i18nStamp = Date.now();

	const version = getVersion(this.options, language);

	if (version) {
		data.i18nVersion = version;
	}

	AsyncStorage.setItem(getStorageKey(this.options.prefix, language, namespace), JSON.stringify(data));
};

export default AsyncStorageBackend
