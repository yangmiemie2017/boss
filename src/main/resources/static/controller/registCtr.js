var registCtr = angular.module('registCtr', [ 'ui.router', 'service' ]);

registCtr.controller("registCtr", function($scope, $state, $http, $window,
		HttpService, $rootScope) {
	$scope.userRegister = function() {
		HttpService.post('/regist', $scope.formData).then(
				function(response) {

						//$window.sessionStorage.setItem('TOKEN', $scope.respData.userDetail.token);
					$window.sessionStorage.setItem('TOKEN',response.data.userDetail.token);
						//$rootScope.userRoles = $scope.respData.roles;
						//$rootScope.userDetails = $scope.respData.userDetail;
						$state.go("app.home");
				},
				function(response) {
					HttpService.error(response.data,response.status,$scope);

				});
	};

	$scope.changeRegister = function(hideId, showId) {
		$(hideId).hide();
		$(showId).show();
	}

	$scope.validPassStrength = function(pass) {
		return;
		var myurl = "validPwd?pass=" + pass;
		if (pass == null) {
			$scope.pwdVeryWeak = false;
			$scope.pwdWeak = false;
			$scope.pwdMedium = false;
			$scope.pwdStrong = false;
			$scope.pwdVeryStrong = false;
		} else {

			$.ajax({
				url : "/" + myurl,
				type : "POST",
				error : function(data) {
					alert("a problem...");
				},
				success : function(data) {
					if (data == "-1") {
						$scope.pwdVeryWeak = true;
						$scope.pwdWeak = false;
						$scope.pwdMedium = false;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = false;
					}

					if (data == "-2") {
						$scope.pwdVeryWeak = true;
						$scope.pwdWeak = false;
						$scope.pwdMedium = false;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = false;
					}
					if (data == "0") {
						$scope.pwdVeryWeak = true;
						$scope.pwdWeak = false;
						$scope.pwdMedium = false;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = false;
					}
					if (data == "1") {
						$scope.pwdVeryWeak = false;
						$scope.pwdWeak = true;
						$scope.pwdMedium = false;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = false;
					}
					if (data == "2") {
						$scope.pwdVeryWeak = false;
						$scope.pwdWeak = false;
						$scope.pwdMedium = true;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = false;
					}
					if (data == "3") {
						$scope.pwdVeryWeak = false;
						$scope.pwdWeak = false;
						$scope.pwdMedium = false;
						$scope.pwdStrong = true;
						$scope.pwdVeryStrong = false;
					}
					if (data == "4") {
						$scope.pwdVeryWeak = false;
						$scope.pwdWeak = false;
						$scope.pwdMedium = false;
						$scope.pwdStrong = false;
						$scope.pwdVeryStrong = true;
					}
				}
			})
		}
	}
})
