/*
 * This is a base implementation of of a plugin handler and its plugin object where upon 
 * registering/unregistering the plugin's repsective methods are called. This is not 
 * intended to function on its own, but to be extended via a framework specific implementation 
 * of the plugin object
 */

var PluginHandler = (function() {
	var plugins = {};

	// Define plugin tyepe
	var PLUGIN_TYPE = "PLUGIN";

	// Define Plugin Object
	var Plugin = function(onRegisterCall, onUnregisterCall) {
		var self = this;
		this.id = _guid();
		this.type = PLUGIN_TYPE;
		this.onRegister = function() {
			if (onRegisterCall) onRegisterCall.call(self);
		}
		this.onUnregister = function() {
			if (onUnregisterCall) onUnregisterCall.call(self);
		}
		this.toString = function() {
			return self.type + "[" + self.id + "]";
		}
	}

	// Generates a guid for use with plugins
	function _guid() {
		function S4() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	// Verifies if the plugin is a hard type
	var _verifyPlugin = function(plugin) {
		if (!plugin.type || plugin.type != PLUGIN_TYPE) {
			_throwExcpetion("Incompatible object Exception");
		}
	}

	// Throws an exception and logs it to the console
	var _throwExcpetion = function(msg) {
		console.log(msg);
		throw msg;
	}

	return {
		Plugin : Plugin,

		register : function(plugin) {
			_verifyPlugin(plugin);

			plugins[plugin.id] = plugin;		

			if (!plugins[plugin.id]) {
				_throwExcpetion(plugin + " was not added successfully");
			}

			plugin.onRegister();
		}, 

		unregister : function(plugin) {
			_verifyPlugin(plugin);

			this.unregisterById(plugin.id)
		},

		unregisterById : function(id) {
			// Verify that plugin is present in list of plugins
			if (!plugins[id]) {
				_throwExcpetion(plugin + " does not exist");				
			}

			var plugin = plugins[id];
			delete plugins[id];
			
			// Verify that plugin was successfully removed
			if (plugins[id]) {
				_throwExcpetion(plugin + " was not removed successfully");
			}

			plugin.onUnregister();
		}
	}	
})();