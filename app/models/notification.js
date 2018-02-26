"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uuid = require("node-uuid");

delete mongoose.models.Notifications;
delete mongoose.modelSchemas.Notifications;

var NotificationsSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	data: {
		contentType: {
			type: String,
			ref: "ContentType",
		},
		events: [{
			name: {
				type: String,
				required: true,
			},
			topic: {
				type: String,
				required: true,
			}
		}]
	},
	meta: {
		label: {
			type: String,
			required: true,
		},
		safeLabel: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
			default: "other",
		},
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastModified: {
			type: Date,
			required: true,
			default: Date.now,
		}
	}
});

// Set the name of the collection
NotificationsSchema.set("collection", "notifications");
module.exports = mongoose.model("Notifications", NotificationsSchema);
