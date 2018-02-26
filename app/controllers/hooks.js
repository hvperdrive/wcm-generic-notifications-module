"use strict";

const eventListener = require("../helpers/listener").instance;
const variables = require("../helpers/variables");

const beforeRemove = () => eventListener.removeListeners();
const onConfigurationChanged = () => {
	return variables.reload()
		.then(() => eventListener.reinitialize())
};
const onLoadComplete = () => {
	return variables.reload()
		.then(() => eventListener.reinitialize());
}

module.exports = function handleHooks(hooks) {
	var myHooks = {
		beforeRemove: beforeRemove,
		onConfigurationChanged: onConfigurationChanged,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};
