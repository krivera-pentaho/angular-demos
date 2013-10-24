/* Define Services */
var services = angular.module("services", []);

// Demo 1
services.factory("Demo1Factory", 
	function() {
		var objs = [];

		return {
			get: function(n) {
				objs = []
				for (var i = 0; i < n; i++) {
					objs.push(this._make("Demo Object "+i, "This is the description for Demo Object "+i));
				}
				return objs;
			},
			_make : function(name, description) {
				return {
					name : name,
					description : description
				}
			}
		}
	});

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