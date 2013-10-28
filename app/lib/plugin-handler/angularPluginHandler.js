/*
 * An implementation of the plugin handler for use with AngularJS
 */

var AngularPluginHandler = (function(){

	// Define an extended plugin of PluginHandler.Plugin
	var AngularPlugin = function(url, partialFilePath, controller) {
		this.__proto__ = new PluginHandler.Plugin(_onRegister, _onUnregister);

		this.url = url;
		this.partial = partialFilePath;
		this.controller = controller;
	};

	var _onRegister = function() {
		alert("registered");
	}

	var _onUnregister = function() {
		alert("unregistered");
	}

	var testPlugin = new AngularPlugin();
	// PluginHandler.register(testPlugin);
	// PluginHandler.unregister(testPlugin);

	return {
		createPlugin : function() {
			var plugin = new AngularPlugin();
			return plugin;
		}
	}
})();

