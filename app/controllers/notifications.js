"use strict";

const path = require("path");

const ERROR_TYPES = require(path.join(process.cwd(), "app/middleware/errorInterceptor")).ERROR_TYPES;
const Emitter = require("@wcm/module-helper").emitter;

const EventsModel = require("../models/notification");
const listener = require("../helpers/listener").instance;

module.exports.list = (req, res) => {
	let result = ["contentUpdated", "contentCreated", "contentRemoved"];

	if (Emitter.listRegisterdEvents) {
		result = Emitter.listRegisterdEvents();
	}

	res.status(200).json(result);
};

module.exports.getMappers = (req, res) => res.status(200).json({ data: listener.mappers });

module.exports.getEmitters = (req, res) => res.status(200).json({ data: listener.emitters });

/**
 * @api {GET} /api/1.0.0/notifications/ Get all event setups
 * @apiGroup Notifications
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} Notifications200All Success
 *
 * @apiError (500) {Object} Error Bad request
 */
module.exports.read = (req, res) => {
	EventsModel.find({})
		.populate("data.contentType")
		.then(
			(events) => res.status(200).json(events),
			(responseError) => res.status(500).json({ err: responseError })
		);
};

/**
 * @api {GET} /api/1.0.0/notifications/:uuid Get an event setup
 * @apiGroup Notifications
 * @apiParam {String} uuid Notification uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Notifications200One Success
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (404) {Object} Error Not found
 * @apiError (400) {Object} Error Bad request
 */
module.exports.readOne = (req, res) => {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
		.populate("data.contentType")
		.then(
			(event) => {
				if (event) {
					return res.status(200).json(event);
				}

				return res.status(404).json({
					err: 'Event with uuid: "' + req.params.uuid + '" not found',
				});
			},
			(responseError) => res.status(400).json({ err: responseError })
		);
};

/**
 * @api {PUT} /api/1.0.0/notifications/:uuid Update Event setup
 * @apiGroup Notifications
 * @apiParam {String} uuid Notification uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Notifications200Update Success
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (404) {Object} Error Not found
 * @apiError (400) {Object} Error Bad request
 */
module.exports.update = function update(req, res) {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
		.lean()
		.then(function onSuccess(oldEvent) {
			return EventsModel.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true, setDefaultsOnInsert: true })
				.then(function (newEvent) {
					if (newEvent) {
                        listener.reloadConfig();
                        return newEvent;
					}

					throw { status: 404, err: "Event width uuid: '" + req.params.uuid + "' not found" };
				});
		}, function (error) {
			throw { status: 400, err: error };
		})
		.then(function (newEvent) {
			return res.status(200).json(newEvent);
		}, function (error) {
			return res.status(error.status || 400).json({ err: error.err || error });
		});
};

/**
 * @api {POST} /api/1.0.0/notifications create an event.
 * @apiGroup Notifications
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object} Notifications200CreateSuccess
 *
 * @apiError (400) {Object} Error Bad request
 */
module.exports.create = (req, res) => {
	EventsModel.create(req.body)
		.then((event) => {
			if (!event) {
				throw "Event not saved!";
			}

            listener.reloadConfig();

            return event;
			// return topicsHelper.create(event);
		}).then(
			(event) => res.status(200).json(event),
			(responseError) => res.status(400).json({ err: responseError })
		);
};

/**
 * @api {DELETE} /api/1.0.0/notifications/:uuid Delete an event setup.
 * @apiGroup Notifications
 * @apiParam {String} uuid Notification uuid
 * @apiVersion 1.0.0
 *
 * @apiSuccess (204) Empty Empty response
 *
 * @apiError (412) {Object} Error Precondition failed
 * @apiError (400) {Object} Error Bad request
 */
module.exports.remove = (req, res) => {
	if (!req.params.uuid) {
		return res.status(412).json({
			logType: ERROR_TYPES.NO_UUID,
			err: "There is no uuid parameter specified!",
		});
	}

	EventsModel.findOne({ uuid: req.params.uuid })
        .then((event) => EventsModel.remove({ uuid: req.params.uuid }).then(() => event))
        .then(() => listener.reloadConfig())
		.then(
			() => res.status(204).send(),
			(responseError) => res.status(400).json({ err: responseError })
		);
};
