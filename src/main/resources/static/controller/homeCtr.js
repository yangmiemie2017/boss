var controller = angular.module('homeCtr', [ 'ui.router', 'service' ]);

// home Controller
controller.controller("homeCtr", function($scope, $state, $window,
		$rootScope, HttpService) {
	$scope.accountSummary = {};
	
	HttpService.get('/books').then(
			function(response) {
				$scope.books = angular.fromJson(response.data);
			},
			function(response) {
				HttpService.error(response.data,response.status,$scope);
			});
});

//User Update Controller
controller.controller("userListCtr", function($scope, $state, $window,
		$rootScope, HttpService) {
	HttpService.get('/admin/users').then(function(response) {
		$rootScope.items = angular.fromJson(response.data);
	}, function(response) {
		HttpService.error(response.data,response.status,$scope);
	});
	
	$scope.listUpdate = function() {
		var uid = $('input[name="opt"]:checked').val();
		if (uid == null || uid == "") {
			$("#alert").modal();
			return;
		}
		
		$window.sessionStorage.setItem('USER_ID',uid);
		$state.go("app.userUpdate");
	};

});

//User Update Controller
controller.controller("userUpdateCtr", function($scope, $state, $window,
		$rootScope, HttpService, $timeout) {
	
	var uid = $window.sessionStorage.getItem('USER_ID');
	
	HttpService.get('/admin/user/'+uid).then(function(response) {
		$scope.user = response.data;
	}, function(response) {
		HttpService.error(response.data,response.status,$scope);
	});


	$scope.userUpdate = function() {
		$scope.infoData = {};
		var uid = $window.sessionStorage.getItem('USER_ID');
		
		HttpService.post('/admin/user/'+uid, $scope.user)
			.then(function(response) {
				$scope.respData = angular.fromJson(response.data);
				if ('00' == $scope.respData.responseCode) {
					$scope.infoData.complete = true;
					$timeout(function(){
						$state.go("app.userList");
					},2000);
				}
			}, function(response) {
				HttpService.error(response.data,response.status,$scope);
				
				$scope.responseMessage = response.data;
				$scope.respData = angular.fromJson(response.data);
				$scope.errorData = $scope.respData.errors;
			});
		};
});
