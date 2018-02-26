"use strict";

const eventListener = require("../helpers/listener").instance;
const variables = require("../helpers/variables");

// Remove event listeners on module removal
const beforeRemove = () => eventListener.removeListeners();
// Get variables and (re)initialize the eventListener on module configurations changed
const onConfigurationChanged = () => {
	return variables.reload()
		.then(() => eventListener.reinitialize())
};
// Get variables and (re)initialize the eventListener on module loaded
const onLoadComplete = () => {
	return variables.reload()
		.then(() => eventListener.reinitialize());
}

// Register module system hooks
module.exports = function handleHooks(hooks) {
	var myHooks = {
		beforeRemove: beforeRemove,
		onConfigurationChanged: onConfigurationChanged,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};
