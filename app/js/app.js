
/* App Definiton */
var app = angular.module('angular-demo-app', ['ngRoute', 'ngAnimate', 'controllers']);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/demo1', {
				templateUrl : 'partials/demo1.html',
				controller : 'Demo1Controller'
			})
			.when('/demo2', {
				templateUrl : 'partials/demo2.html',
				controller : 'Demo2Controller' 
			})
			.when('/demo3', {
				templateUrl : 'partials/demo3.html',
				controller : 'Demo3Controller'
			})
			.otherwise({
				redirectTo: '/'
			})
	}]);

$(window).on("hashchange", function () {
	$(".slide-item").removeClass("in").addClass("out");
});

$(".demo-buttons .btn").on("click", function() {
	$(".slide-item").removeClass("out").addClass("in");
})