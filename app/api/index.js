"use strict";

const listener = require("../helpers/listener").instance;

// Exposed methods (available for other modules)
module.exports = {
	/**
	 * name: String,
	 * fn: Function(
	 * 		eventName: String,
	 * 		configuredEvent: Object,
	 * 		data: Any
	 * )
	 */
	registerMapper: listener.registerMapper,

	/**
	 * name: String,
	 * fn: Function(
	 * 		eventName: String,
	 * 		configuredEvent: Object,
	 * 		data: Any
	 * )
	 */
	registerEmitter: listener.registerEmitter,

	/**
	 * name: String
	 */
	unregisterMapper: listener.unregisterMapper,

	/**
	 * name: String
	 */
	unregisterEmitter: listener.unregisterEmitter
};
