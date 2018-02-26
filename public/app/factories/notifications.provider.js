"use strict";

(function(angular) {
	angular.module("notifications_0.0.1.factories")
		.factory("notificationsFactory", [
			"$resource",
			"configuration",

			function notificationsFactory($resource, configuration) {

				var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
				var factory = {};

				factory = $resource(api + "notifications/:listController:id/:docController", {
					id: "@uuid",
					listController: "@listController",
					docController: "@docController",
				}, {
					update: {
						method: "PUT",
					},
				});

				return factory;
			}
		]);
})(window.angular)
