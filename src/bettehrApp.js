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

	bettehrApp.controller('TestsController', function($scope, parseXMLFactory) {
		this.parseTest = parseXMLFactory.raw.testResults;
		console.log(parseTest);
		this.date = focusDate;
		this.tests = testsOnDate;
	});

	bettehrApp.factory("ccdData", function($http) {
		return $http.get('CCD/modified_marla_CCD.xml');
	});

	bettehrApp.controller("PatientInfo", function($scope, ccdData) {
		$scope.t = this;
		ccdData.success(function(data) {
			$scope.home = data;
			// Obviously should be parsed
			$scope.t.firstName = "Marla";
			$scope.t.lastName = "Dixon";
			$scope.t.age="62";
			$scope.t.gender= "F";

		});
		this.firstName = "";
		this.lastName = "";
		this.age="";
		this.gender="";
	});
})();