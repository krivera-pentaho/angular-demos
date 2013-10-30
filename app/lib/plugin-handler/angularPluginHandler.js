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
 * 
 * EXAMPLE Route 		{ url : 'String', templateUrl : 'String', controller : 'String' }
 * EXAMPLE Controller 	{ name : 'String', def : 'Function or Array' }
 * EXAMPLE Service 		{ name : 'String', def : 'Function or Array' }
 */

var AngularPluginHandler = (function() {

	// Define an extended plugin of PluginHandler.Plugin
	var AngularPlugin = function(moduleName, route, controller, service, onRegister, onUnregister) {		
		$.extend(this, new PluginHandler.Plugin(_onRegister, _onUnregister));		

		this.moduleName = moduleName;		
		this.route = route;
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

		// Create controllers
		$(plugin.controller).each(function(i, controller) {
			module.controllerProvider.register(controller.name, controller.def);	
		});		

		// Create Services
		$(plugin.service).each(function(i, service) {
			module.provide.service(service.name, service.def);	
		});
		
		// Append routes
		$(plugin.route).each(function(i, route) {
			module.routeProvider
				.when(route.url, {
					templateUrl : route.templateUrl,
					controller : route.controller
				});				
		});		
	}

	// Provide function for onUnregister
	var _onUnregister = function(plugin) {
		// Retrieve module
		var module = angular.module(plugin.moduleName);

		// Unbind Controllers
		$(plugin.controller).each(function(i, controller) {
			module.controllerProvider.register(controller.name, null);
		})

		// Unbind Services
		$(plugin.service).each(function(i, service) {
			module.provide.service(service.name, null);
		})
		
		// Unbind routes
		$(plugin.route).each(function(i, route) {
			module.routeProvider
				.when(route.url, {
					// TODO : find way to retrieve default location of otherwise binding
					redirectTo : "/"				
				});
			});
	}

	// This attaches the appropriate methods and objects directly to the module to allow the module
	// to be pluggable later
	var makePluggable = function(module) {
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
		makePluggable : makePluggable
	}
})();

