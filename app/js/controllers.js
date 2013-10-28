/* Define Controllers */
var module = angular.module("controllers", ['services']);

// Demo 1 Controller
module.controller("Demo1Controller",[ "$scope", "Demo1Factory",
	function($scope, Demo1Factory) {		
		$scope.objects = Demo1Factory.get(3);

		$scope.addClick = function() {

			$scope.objects.push(Demo1Factory.get(1));
		}

		$scope.removeClick = function() {
				$scope.objects.pop();		
		}
	}]);

// Demo 2 Controler
module.controller("Demo2Controller", ["$scope", "Demo2Service",
	function($scope, Demo2Service) {
		$scope.employees = Demo2Service.get();
	}]);

// Demo 3 Controller
module.controller("Demo3Controller", ["$scope",
	function($scope) {

	}]);