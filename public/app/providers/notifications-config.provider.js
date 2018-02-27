"use strict";

(function(angular) {
	angular.module("notifications_0.0.1")
		.provider("notificationConfig", [

			"MODULE_ENV_CONFIG",

			function testConfig(MODULE_ENV_CONFIG) {

				this.API = {
					name: MODULE_ENV_CONFIG.angularModule,
					version: "0.0.1",
					feDirPath: MODULE_ENV_CONFIG.feDirPath,
					assetsDirPath: MODULE_ENV_CONFIG.assetsDirPath,
					cssDirPath: MODULE_ENV_CONFIG.cssDirPath
				};

				this.API.modulePath = this.API.feDirPath;

				this.$get = function get() {
					return this.API;
				};
			}
		]);
})(window.angular);
