"use strict";

(function(angular) {
	angular.module("notifications_0.0.1.factories", []);
	angular.module("notifications_0.0.1.services", ["notifications_0.0.1.factories"]);
	angular.module("notifications_0.0.1.controllers", ["notifications_0.0.1.services"]);
	angular.module("notifications_0.0.1.directives", ["notifications_0.0.1.controllers"]);

	angular.module("notifications_0.0.1", [

		"pelorus.services",

		"notifications_0.0.1.factories",
		"notifications_0.0.1.services",
		"notifications_0.0.1.controllers",
		"notifications_0.0.1.directives"

	])
	.run([function () {
		console.log("Notification module is loaded and available!"); // eslint-disable-line no-console
	}]);
})(window.angular);
