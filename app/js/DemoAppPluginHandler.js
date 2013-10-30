/*
 * Extension of Angular Plugin for use in Demo App
 */
var DemoAppPluginHandler = (function(){

	var DemoAppPlugin = function(pluginName, moduleName, routeUrl, templateUrl, controller, service) {
		$.extend(this, new AngularPluginHandler.AngularPlugin(moduleName, routeUrl, templateUrl, controller, service, _onRegister, _onUnregister));

		this.pluginName = pluginName;
	}

	var _onRegister = function(plugin) {
		$(document).ready(function() {
			var linkButton = $("<li><a href='#" + plugin.routeUrl + "'><button class='btn btn-default'>" + plugin.pluginName + "</button></a></li>'");
			$("#demo-buttons").append(linkButton);
			plugin.linkButton = linkButton;
		});		
	}

	var _onUnregister = function(plugin) {
		plugin.linkButton.remove();

		// TODO : clean up view area
	}

	return {
		DemoAppPlugin : DemoAppPlugin
	}
})();