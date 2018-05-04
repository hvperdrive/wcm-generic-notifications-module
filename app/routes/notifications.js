"use strict";

const path = require("path");

// Get the configuration of the WCM
const config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
const ProfileSecurity = require("@wcm/module-helper").profileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
const MethodSecurity = require("@wcm/module-helper").methodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
const PermissionsSecurity = require("@wcm/module-helper").permissionsSecurity("notifications");
// Modifies meta object of the body
const Meta = require(path.join(process.cwd(), "app/helpers/meta"));
// Notification controller
const NotificationsController = require("../controllers/notifications");

// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
const baseUrl = "/" + config.api.prefix + config.api.version + "notifications";

module.exports = function(app) {

	app.route(baseUrl).get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, NotificationsController.read);
	app.route(baseUrl + "/list").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, NotificationsController.list);
	app.route(baseUrl + "/mappers").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, NotificationsController.getMappers);
	app.route(baseUrl + "/emitters").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, NotificationsController.getEmitters);
	app.route(baseUrl + "/:uuid").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, NotificationsController.readOne);

	app.route(baseUrl).post(ProfileSecurity, MethodSecurity.create, PermissionsSecurity, Meta, NotificationsController.create);

	app.route(baseUrl + "/:uuid").put(ProfileSecurity, MethodSecurity.update, PermissionsSecurity, Meta, NotificationsController.update);

	app.route(baseUrl + "/:uuid").delete(ProfileSecurity, MethodSecurity.delete, PermissionsSecurity, NotificationsController.remove);

};
