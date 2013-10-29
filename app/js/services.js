/* Define Services */
var services = angular.module("services", []);

// Demo 2
services.service("Demo2Service",
	function() {
		var data = [
			{
				name : "Kris Rivera",
				position : "Software"
			},
			{
				name : "Robert Fellows",
				position : "Software"
			},
			{
				name : "Brett Christenson",
				position : "UX"
			},
			{
				name : "John Dorlus",
				position : "QA"
			},
			{
				name : "Wes Brown",
				position : "UX"
			},
			{
				name : "Sandra Wagner",
				position : "Doc"
			},
			{
				name : "David Kincade",
				position : "Manager"
			},
		];


		this.get = function() {
			return data;
		}
	});