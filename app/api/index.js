"use strict";

const listener = require("../helpers/listener").instance;

module.exports = {
	registerMapper: listener.registerMapper,
	registerEmitter: listener.registerEmitter,
	unregisterMapper: listener.unregisterMapper,
	unregisterEmitter: listener.unregisterEmitter
};
