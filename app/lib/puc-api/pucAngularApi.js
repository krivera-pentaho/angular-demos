/*
 *
 */

// Namespace for PUC api objects
var PUC = (function() {
	return {};
})();

// Handle plugins for plugging in new content
PUC.AngularPluginHandler = (function() {

	var PUCAngularPlugin = function(routes, controllers, services, onRegister, onUnregister) {
		$.extend(this, new AngularPluginHandler.AngularPlugin("PUC-angular-app-wrapper", routes, controllers, services, 
			[_onRegister, onRegister], [_onUnregister, onUnregister]));
	};

	var _onRegister = function(plugin) {
		// TODO - Add code for PUC which is required after registration - possibly start of loading modal
	}

	var _onUnregister = function(plugin) {
		// TODO - Add code for clean up of PUC view
	}

	return {
		PUCAngularPlugin : PUCAngularPlugin
	};
})();