var loginCtr = angular.module('loginCtr',['ui.router','service']);

//login Controller
loginCtr.controller("loginCtr", function($scope, $rootScope, $state, $http, $window, HttpService) {
	$scope.userLogin = function() {
		HttpService.post('/login', $scope.formData)
		.then(function(response) {
			console.log(response);
			//$scope.respData = {};

			//$scope.responseMessage = response.data;
			//$scope.respData = angular.fromJson(response.data);
			//if('200'== $scope.response.status){
				//$window.sessionStorage.setItem('TOKEN',$scope.respData.userDetail.token);
				$window.sessionStorage.setItem('TOKEN',response.data.userDetail.token);
				//$rootScope.userRoles = $scope.respData.roles;
				//$rootScope.userDetails = $scope.respData.userDetail;
				$state.go("app.home");
			//}
		},function(response){
			HttpService.error(response.data,response.status,$scope);
			
			$scope.responseMessage = response.data;
			//$scope.respData = angular.fromJson(response.data);
			//if('11'== $scope.respData.responseCode || '01'== $scope.respData.responseCode){
			//	$scope.errorData = $scope.respData.errors;
			//}
		});
	}
})
