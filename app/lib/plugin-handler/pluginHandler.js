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
	var Plugin = function(onRegister, onUnregister) {		
		this.id = _guid();
		this.type = PLUGIN_TYPE;
		this.register = function() {
			register.call(this, this);
		}
		this.unregister = function() {
			unregister.call(this, this);
		}
		this.onRegister = function() {
			if (onRegister) {
				onRegister.call(this, this);
			}
		}
		this.onUnregister = function() {
			if (onUnregister) {
				onUnregister.call(this, this);
			}
		}
		this.toString = function() {
			return this.type + "[" + this.id + "]";
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

	// Register a single plugin
	var register = function(plugin) {
		_verifyPlugin(plugin);

		if (plugins[plugin.id]) {
			_throwExcpetion("WARNING: " + plugin + "already registered");
			return;
		}

		plugins[plugin.id] = plugin;		

		if (!plugins[plugin.id]) {
			_throwExcpetion(plugin + " was not added successfully");
		}
		console.log(plugin + " has been registered");
		plugin.onRegister.call(plugin);
	}

	// Unregister a single plugin
	var unregister = function(plugin) {
		_verifyPlugin(plugin);

		unregisterById(plugin.id)
	}

	// Unregisters a singly plugin by its id
	var unregisterById = function(id) {
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

		plugin.onUnregister.call(plugin);
	}

	return {
		Plugin : Plugin,
		register : register, 
		unregister : unregister,
		unregisterById : unregisterById
	}	
})();