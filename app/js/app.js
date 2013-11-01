
/* App Definiton */
var app = angular.module('angular-demo-app', ['ngRoute', 'ngAnimate', 'controllers']);

// Used to make the module pluggable via the AngularPluginHandler framework
AngularPluginHandler.makePluggable(app);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/demo2', {
				templateUrl : 'partials/demo2.html',
				controller : 'Demo2Controller' 
			})
			.when('/demo3', {
				templateUrl : 'partials/demo3.html',
				controller : 'Demo3Controller'
			})
			.when('/demo4', {
				templateUrl : 'partials/demo4.html',
				controller : 'Demo3Controller'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	.run(['$rootScope','$location', function($rootScope, $location) {
		app.$location = $location;

		// $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {

		// 	if (lastLocation == nextLocation) {
		// 		$(".slide-item").addClass("out").removeClass("in");
		// 	} else {
		// 		$(".slide-item").addClass("in").removeClass("out");
		// 	}		   		  
		// });

		// $rootScope.$on("$locationChangeSuccess", function (event, newLocation, oldLocation) {
		//    lastLocation = oldLocation;
		// });

		// $rootScope.$on("$ngClick", function() {
		// 	alert("yes");
		// });
	}]);

var lastLocation = "";

// $(window).on("hashchange", function () {
// 	$(".slide-item").addClass("out").removeClass("in");
// });

$(document).ready(function() {
	$(".demo-buttons .btn").on("click", function() {
		$(".slide-item").removeClass("out").addClass("in");
	});
});
