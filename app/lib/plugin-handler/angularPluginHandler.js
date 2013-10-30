/*
 * An implementation of the plugin handler for use with AngularJS. Also requires jQuery
 *
 * To allow for lazy loading of plugins, when configuring the module where the plugin will be stored,
 * the module must define the following as part of the module's data. You can also use the convenience 
 * function "makeModulePluggable" to do this work for you. Your own configuartion can also be provided
 * and not conflict with the actions performed in "makeModulePluggable"
 * 
 * EXAMPLE
 * 	var app = angular.module('app-module-name', ['dependancy1', 'dependancy2', ...]);
 *	
 * 	app.config(['$routeProvider', '$controllerProvider', '$provide',
 * 		function ($routeProvider, $controllerProvider, $provide) {
 * 			app.controllerProvider = $controllerProvider;
 * 			app.routeProvider      = $routeProvider;
 * 			app.provide            = $provide;
 *
 *			///////////////////////////////
 *			// APPLICATION CONFIGURATION //
 *			///////////////////////////////
 *		}]);
 */

var AngularPluginHandler = (function() {

	// Define an extended plugin of PluginHandler.Plugin
	var AngularPlugin = function(moduleName, routeUrl, templateUrl, controller, service, onRegister, onUnregister) {		
		$.extend(this, new PluginHandler.Plugin(_onRegister, _onUnregister));		

		this.moduleName = moduleName;
		this.routeUrl = routeUrl;
		this.templateUrl = templateUrl;
		this.controller = controller;
		this.service = service;

		// Need to wrap base implementation of onRegister to allow for an additional onRegister
		var baseOnRegister = this.onRegister;
		this.onRegister = function() {
			baseOnRegister.call(this, this);

			if (onRegister) {
				onRegister.call(this, this);
			}
		}

		// Need to wrap base implementation of onUnregister to allow for an additional onUnregister
		var baseOnUnregister = this.onUnregister;
		this.onUnregister = function() {
			baseOnUnregister.call(this, this);

			if (onUnregister) {
				onUnregister.call(this, this);
			}
		}
	};

	// Provide function for onRegister
	var _onRegister = function(plugin) {

		// Retrieve module
		var module = angular.module(plugin.moduleName);

		// Create controller
		module.controllerProvider.register(plugin.controller.name, plugin.controller.def);

		// Create Service
		module.provide.service(plugin.service.name, plugin.service.def);
		
		// Append route
		module.routeProvider
			.when(plugin.routeUrl, {
				templateUrl : plugin.templateUrl,
				controller : plugin.controller.name
			});			
	}

	// Provide function for onUnregister
	var _onUnregister = function(plugin) {
		// Retrieve module
		var module = angular.module(plugin.moduleName);

		// Unbind Controller
		module.controllerProvider.register(plugin.controller.name, null);

		// Unbind Service
		module.provide.service(plugin.service.name, null);
		
		// Append route
		module.routeProvider
			.when(plugin.routeUrl, {
				// TODO : find way to retrieve default location of otherwise binding
				redirectTo : "/"				
			});
	}

	// This attaches the appropriate methods and objects directly to the module to allow the module
	// to be pluggable later
	var makeModulePluggable = function(module) {
		module.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
			function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
				app.controllerProvider = $controllerProvider;
		        app.compileProvider    = $compileProvider;
		        app.routeProvider      = $routeProvider;
		        app.filterProvider     = $filterProvider;
		        app.provide            = $provide;
		    }]);
	}

	return {
		AngularPlugin : AngularPlugin,
		makeModulePluggable : makeModulePluggable
	}
})();

