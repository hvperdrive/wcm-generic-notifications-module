"use strict";

const listener = require("../helpers/listener").instance;

// Exposed methods (available for other modules)
module.exports = {
	registerMapper: listener.registerMapper,
	registerEmitter: listener.registerEmitter,
	unregisterMapper: listener.unregisterMapper,
	unregisterEmitter: listener.unregisterEmitter
};
