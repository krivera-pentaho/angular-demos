/*
 * Extension of Angular Plugin for use in Demo App
 */
var DemoAppPluginHandler = (function(){

	var DemoAppPlugin = function(pluginName, startRouteUrl, moduleName, routes, controllers, services) {
		$.extend(this, new AngularPluginHandler.AngularPlugin(moduleName, routes, controllers, services, _onRegister, _onUnregister));

		this.pluginName = pluginName;
		this.startRouteUrl = startRouteUrl;
	}

	var _onRegister = function(plugin) {
		$(document).ready(function() {
			var linkButton = $("<li><a href='#" + plugin.startRouteUrl + "'><button class='btn btn-default'>" + plugin.pluginName + "</button></a></li>'");
			$("#demo-buttons").append(linkButton);
			plugin.linkButton = linkButton;
		});		
	}

	var _onUnregister = function(plugin) {
		plugin.linkButton.remove();

		var module = angular.module(plugin.moduleName);

		var hashUrl = module.$location.path();
		$(plugin.routes).each(function(i, route) {
			if (hashUrl == route.url) {
				window.history.back();				
				return false;
			}
		});
	}

	return {
		DemoAppPlugin : DemoAppPlugin
	}
})();