export const getStorageKey = (prefix, language, namespace) => {
	return `${prefix}${language}-${namespace}`;
};

export const getVersion = (options, language) => {
	return options.versions[language] || options.defaultVersion;
};
