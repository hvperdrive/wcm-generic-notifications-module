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
	registerMapper: listener.registerMapper.bind(listener),

	/**
	 * name: String,
	 * fn: Function(
	 * 		eventName: String,
	 * 		configuredEvent: Object,
	 * 		data: Any
	 * )
	 */
	registerEmitter: listener.registerEmitter.bind(listener),

	/**
	 * name: String
	 */
	unregisterMapper: listener.unregisterMapper.bind(listener),

	/**
	 * name: String
	 */
	unregisterEmitter: listener.unregisterEmitter.bind(listener)
};
