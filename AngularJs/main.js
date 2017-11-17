var app = angular.module("app", []);

app.controller("MyController", function ($scope, $q, $timeout) {
	$scope.test = 'Hello World';
});
