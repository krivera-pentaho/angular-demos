/*
 * An implementation of the plugin handler for use with AngularJS. Also requires jQuery
 */

var AngularPluginHandler = (function() {

	// Define an extended plugin of PluginHandler.Plugin
	var AngularPlugin = function(moduleName, routeUrl, templateUrl, controller, service) {		
		$.extend(this, new PluginHandler.Plugin(_onRegister, _onUnregister));		

		this.moduleName = moduleName;
		this.routeUrl = routeUrl;
		this.templateUrl = templateUrl;
		this.controller = controller;
		this.service = service;
	};

	// Provide function onRegistration
	var _onRegister = function(plugin) {

		// Retrieve module
		var module = angular.module(plugin.moduleName);

		// Create controller
		module.controller(plugin.controller.name, plugin.controller.def);

		// Create Service
		module.service(plugin.service.name, plugin.service.def);
		
		// Append route
		module.config(['$routeProvider',
			function ($routeProvider) {
				$routeProvider
					.when(plugin.routeUrl, {
						templateUrl : plugin.templateUrl,
						controller : plugin.controller.name
					});					
			}]);				
	}

	var _onUnregister = function(plugin) {
		// Retrieve module
		var module = angular.module(plugin.moduleName);

		// Unbind Controller
		module.controller(plugin.controller.name, null);

		// Unbind Service
		module.service(plugin.service.name, null);
		
		// Append route
		module.config(['$routeProvider',
			function ($routeProvider) {
				$routeProvider
					.when(plugin.routeUrl, {
						redirectTo : "/"
					});					
			}]);
	}

	return {
		AngularPlugin : AngularPlugin
	}
})();

