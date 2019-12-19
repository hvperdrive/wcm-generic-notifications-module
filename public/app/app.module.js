"use strict";

(function(angular) {
	angular.module("notifications_0.1.0.factories", []);
	angular.module("notifications_0.1.0.services", ["notifications_0.1.0.factories"]);
	angular.module("notifications_0.1.0.controllers", ["notifications_0.1.0.services"]);
	angular.module("notifications_0.1.0.directives", ["notifications_0.1.0.controllers"]);

	angular.module("notifications_0.1.0", [

		"pelorus.services",

		"notifications_0.1.0.factories",
		"notifications_0.1.0.services",
		"notifications_0.1.0.controllers",
		"notifications_0.1.0.directives"

	])
	.run([function () {
		console.log("Notification module is loaded and available!"); // eslint-disable-line no-console
	}]);
})(window.angular);
