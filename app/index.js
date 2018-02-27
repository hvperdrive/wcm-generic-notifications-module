"use strict";

const setupRoutes = require("./routes");
const variablesHelper = require("./helpers/variables");
const hooksController = require("./controllers/hooks");


// Entry point of this module BE
module.exports = (app, hooks, moduleInfo) => {
	// Get variables
	variablesHelper.reload(moduleInfo);

	// Initiate listener
	require("./helpers/listener");

	// Handle hooks
	hooksController(hooks);

	// Setup routes
	setupRoutes(app, moduleInfo);
};

// Exposed API (for other modules)
module.exports.api = require("./api");
