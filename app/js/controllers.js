/* Define Controllers */
var module = angular.module("controllers", ['services']);

module.controller("Demo1Controller",[ "$scope", "Demo1Factory",
	function($scope, Demo1Factory) {
		var n = 3;
		$scope.objects = Demo1Factory.get(n);

		$scope.addClick = function() {
			$scope.objects = Demo1Factory.get(++n);
		}

		$scope.removeClick = function() {
			$scope.objects = Demo1Factory.get(--n);	
		}
	}]);

module.controller("Demo2Controller", ["$scope", "Demo2Service",
	function($scope, Demo2Service) {
		$scope.employees = Demo2Service.get();
	}]);

module.controller("Demo3Controller", ["$scope",
	function($scope) {

	}])