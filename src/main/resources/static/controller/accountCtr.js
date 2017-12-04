var accountCtr = angular.module('accountCtr', [ 'ui.router', 'service' ]);

accountCtr.controller("checkingAccountCtr", function($scope, $state, $http, $window,
		$rootScope, HttpService) {
	$scope.accountDetails = {};
	
	HttpService.get('http://localhost:8080/account/checkingAccount').then(
			function(response) {
				$scope.accountDetails = angular.fromJson(response.data);
			},
			function(response) {
				HttpService.error(response.data,response.status,$scope);
			});
	
});

accountCtr.controller("savingsAccountCtr", function($scope, $state, $http, $window,
		$rootScope, HttpService) {
	$scope.accountDetails = {};
	
	HttpService.get('http://localhost:8080/account/savingAccount').then(
			function(response) {
				$scope.accountDetails = angular.fromJson(response.data);
			},
			function(response) {
				HttpService.error(response.data,response.status,$scope);
			});
	
});


accountCtr.controller("creditAccountCtr", function($scope, $state, $http, $window,
		$rootScope, HttpService) {
	$scope.accountDetails = {};
	
	HttpService.get('http://localhost:8080/account/creditAccountDetail').then(
			function(response) {
				$scope.accountDetails = angular.fromJson(response.data);
			},
			function(response) {
				HttpService.error(response.data,response.status,$scope);
			});
	
});
