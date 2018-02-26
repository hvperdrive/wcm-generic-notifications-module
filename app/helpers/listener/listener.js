"use strict";

const R = require("ramda");
const Q = require("q");

const Emitter = require("@wcm/module-helper").emitter;
const EventsModel = require("../models/events");

// FILTERS
const contentFilter = (item) => {
	const ct = R.pathOr(false, ["data", "contentType", "meta", "safeLabel"], item);

	if (!ct) {
		return false;
	}

	return (data) => {
		const ctLabel = R.pathOr(null, ["meta", "contentType", "meta", "safeLabel"], data);

		return ct === ctLabel;
	};
};

class Listener {
	config = null;
	mappers = [];
	emitters = [];

	constructor() {
		this.reinitialize();
	}

	// PUBLICS
	reinitialize() {
		this._reloadConfig();
		this._registerListeners();
	}

	removeListeners () {
		Emitter.offAny(this._selector);
	}

	getMappers() {
		return this.mappers.map((mapper) => ({ name: mapper.name }));
	}

	registerMapper(mapperConfig) {
		this.mappers.push(mapperConfig);
	}

	unregisterMapper(name) {
		this.mappers = R.reject((mapper) => mapper.name === name)(this.mappers);
	}

	getEmitters() {
		return this.emitters.map((emitter) => emitter.name === name)(this.emitters);
	}

	registerEmitter(emitterConfig) {
		this.emitters.push(emitterConfig);
	}

	unregisterEmitter(name) {
		this.emitters = R.reject((emitter) => emitter.name === name)(this.emitters);
	}


	// PRIVATES
	_reloadConfig() {
		EventsModel.find({})
			.populate("data.contentType")
			.lean()
			.then((response) => this.config = this._parseConfig(response));
	}

	_registerListeners() {
		Emitter.prependAny(this._selector);
	}

	_selector(name, data) {
		const requiredEvents = this._getRequiredEvents(name, data);

		if (!Array.isArray(requiredEvents) || !requiredEvents.length) {
			return;
		}

		requiredEvents.forEach((event) => Q(this._sendEvent(event, data)));
	}

	_getRequiredEvents(name, data) {
		if (this.config === null || !this.config[name]) {
			return;
		}

		const eventGroup = this.config[name];

		return eventGroup.filter((event) => {
			if (typeof event.filter === "function") {
				return event.filter(data);
			} else if (event.filter === false) {
				return false;
			}

			return true;
		});
	}

	_sendEvent(event, data) {

		console.log("SENDING EVENT", event);
		console.log("DATA:", data);

		// if (!event || !event.topic || !data) {
		// 	return Q.reject();
		// }

		// const topic = config.name + "_" + event.topic;

		// return eventRequestHelper("PUT", topic + "/publish", data);
	}

	_parseConfig(items) {
		const setFilter = (event, item) => {
			const source = R.pathOr(false, ["meta", "source"], item);

			if (source === "content") {
				return contentFilter(item);
			}
		};

		const reduceConfigItem = (acc, item) => R.compose(
			R.always(acc),
			R.forEach((event) => {
				if (!acc[event.name]) {
					acc[event.name] = [];
				}

				acc[event.name].push({
					topic: event.topic,
					filter: setFilter(event, item),
				});
			}),
			R.pathOr([], ["data", "events"])
		)(item);

		return R.reduce(reduceConfigItem, {})(items);
	};

}

module.exports = Listener;
