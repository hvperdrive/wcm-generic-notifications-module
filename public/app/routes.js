"use strict";

(function(angular) {
	angular.module("notifications_0.0.1")
		.config([

			"$stateProvider",
			"notificationConfigProvider",

			function ($stateProvider, notificationConfigProvider) {

				var moduleFolder = notificationConfigProvider.API.modulePath;

				$stateProvider

					.state("pelorus.notifications.index", {
						url: "",
						access: {
							requiresLogin: true,
						},
						resolve: {
							ListData: ["digEventsFactory", function(digEventsFactory) {
								return digEventsFactory.query().$promise;
							}],
						},
						ncyBreadcrumb: {
							label: "{{breadcrumb}}",
						},
						views: {
							"": {
								templateUrl: moduleFolder + "views/overview.html",
								controller: "notificationsOverviewController",
							},
						},
					})

					.state("pelorus.notifications.edit", {
						url: "/{uuid}",
						access: {
							requiresLogin: true,
						},
						resolve: {
							InstanceData: ["notificationsFactory", "$stateParams", function(notificationsFactory, $stateParams) {
								if ($stateParams.uuid && $stateParams.uuid !== "new") {
									return notificationsFactory.get({ id: $stateParams.uuid }).$promise;
								} else {
									return {};
								}
							}],
							EventsList: ["notificationsFactory", function(notificationsFactory) {
								return notificationsFactory.get({ listController: "list" }).$promise;
							}],
							ContentTypes: ["$stateParams", "contentTypeFactory", function($stateParams, contentTypeFactory) {
								return contentTypeFactory.get({ limit: -1 }).$promise;
							}],
						},
						ncyBreadcrumb: {
							label: "{{breadcrumb}}",
						},
						views: {
							"": {
								templateUrl: "/app/core/resource/views/resource.html",
								controller: "notificationsDetailController",
							},
							"form@pelorus.notifications.edit": {
								templateUrl: moduleFolder + "views/detail.html",
							},
						},
					});
			}
		]);
})(window.angular);
