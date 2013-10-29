/* Define Controllers */
var module = angular.module("controllers", ['services']);

// Demo 2 Controler
module.controller("Demo2Controller", ["$scope", "Demo2Service",
	function($scope, Demo2Service) {
		$scope.employees = Demo2Service.get();
	}]);

// Demo 3 Controller
module.controller("Demo3Controller", ["$scope",
	function($scope) {

	}]);