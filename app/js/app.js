
/* App Definiton */
var app = angular.module("angular-demo-app", ["ngRoute", "ngAnimate", "controllers", "services"]);

app.config(
	function ($routeProvider) {
		$routeProvider
			.when("/demo1", {
				templateUrl : "partials/demo1.html",
				controller : "Demo1Controller"
			})
			.when("/demo2", {
				templateUrl : "partials/demo2.html",
				controller : "Demo2Controller" 
			})
			.otherwise({
				redirectTo: "/"
			})
	})