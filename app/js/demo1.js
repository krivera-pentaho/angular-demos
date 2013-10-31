var Demo1 = (function() {

	var controllerDef = [ "$scope", "Demo1Factory",
		function($scope, Demo1Factory) {
			$scope.objects = Demo1Factory.get(3);

			$scope.addClick = function() {

				$scope.objects.push(Demo1Factory.get(1));
			}

			$scope.removeClick = function() {
					$scope.objects.pop();		
			}
		}];

	// Define Controller
	var controller = [{
		name : "Demo1Controller",
		def : controllerDef
	}, {
		name : "Demo4Controller",
		def : controllerDef
	}];

	// Define Service
	var service = {		
		name : "Demo1Factory", 
		def : function() {
			var _make = function(name, description) {
				return {
					name : name,
					description : description
				}
			}

			this.get = function(n) {
				var arr = [];
				for (var i = 0; i < n; i++) {
					var obj = _make("Demo Object", "This is the description for Demo Object"); 

					if (n == 1) {
						return obj;
					}
					
					arr.push(obj);
				}

				return arr;
			}		
		}					
	};

	var route = [{
		url : '/demo1',
		templateUrl : 'partials/demo1.html',
		controller : "Demo1Controller"
	}, {
		url : '/demo4',
		templateUrl : 'partials/demo1.html',
		controller : "Demo4Controller"
	}]

	$(document).ready(function() {
		$("#register-demo1").on("click", Demo1.registerPlugin);
		$("#unregister-demo1").on("click", Demo1.unregisterPlugin);
	});

	var angularPlugin = new DemoAppPluginHandler.DemoAppPlugin('NgRepeat Demo', '/demo1', 'angular-demo-app', route, controller, service);

	return {
		registerPlugin : function() {
			angularPlugin.register();
		},
		unregisterPlugin : function() {
			angularPlugin.unregister();
		}
	}	
})();
