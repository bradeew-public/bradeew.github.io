(function() {
	var bettehrApp = angular.module('bettehrApp',[]);

	//bettehr.factory('bettehrFactory', function(xml) { //WIP, doesn't do anything yet
	//   parseXML(xml);
	//});

	var focusDate = "4/26/2013";

	var testsOnDate = [
		{
			name: "Serum Chloride",
			value: 88,
			unit: "mEq/L"
		},
		{
			name: "Serum Potassium",
			value: 3.4,
			unit: "mEq/L"
		},
		{
			name: "Serum Sodium",
			value: 130,
			unit: "mEq/L",
			additional: "HIGH"
		}
	];

	bettehrApp.controller('TestsController', function() {
		this.date = focusDate;
		this.tests = testsOnDate;
	});



})();