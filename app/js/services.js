/* Define Services */
var services = angular.module("services", []);

// Demo 1
services.factory("Demo1Factory", 
	function() {
		return {
			get: function(n) {
				if (i < 1) {
					return;
				}

				var arr = [];
				for (var i = 0; i < n; i++) {
					var obj = this._make("Demo Object", "This is the description for Demo Object"); 

					if (n == 1) {
						return obj;
					}
					
					arr.push(obj);
				}

				return arr;
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