var app = angular.module("myApp", [ 'ui.router', 'siTable', 'LocalStorageModule','service',
    'loginCtr','registCtr','homeCtr','accountCtr'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider.state("app", {
		url : "/",
		views : {
			'header' : {
			},
			'content' : {
				templateUrl : "page/login.html",
				controller : "loginCtr"
			},
			'footer' : {
			}
		}
	})
	.state("app.home", {
		url : "home",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'userInfo@app.home' : {
				templateUrl : "page/userInfo.html"
			},
			'content@' : {
				templateUrl : "page/home.html",
				controller : "homeCtr"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.detail", {
		url : "detail",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.regist", {
		url : "regist",
		views : {
			'content@' : {
				templateUrl : "page/regist.html",
				controller : "registCtr"
			}
		}
	})
	.state("app.error", {
		url : "error",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'content@' : {
				templateUrl : "page/error.html"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.noPermission", {
		url : "noPermission",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'content@' : {
				templateUrl : "page/noPermission.html"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.userList", {
		url : "userList",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'content@' : {
				templateUrl : "page/adminOp.html",
				controller : "userListCtr"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.userUpdate", {
		url : "userUpdate",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'content@' : {
				templateUrl : "page/userUpdate.html",
				controller : "userUpdateCtr"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
	.state("app.order", {
		url : "order",
		views : {
			'header@' : {
				templateUrl : "header.html",
				controller : "headerCtr"
			},
			'content@' : {
				templateUrl : "page/organize.html",
				controller : "orderCtr"
			},
			'footer@' : {
				templateUrl : "footer.html",
				controller : "footerCtr"
			}
		}
	})
});



// header page controller
app.controller("headerCtr", function($scope, $state, $window, $rootScope, HttpService) {
	
	$scope.userLogoff = function() {
		HttpService.get('/logoff').then(
				function(response) {
					$scope.responseMessage = response.data;
					
					if ('200' == response.status) {
						$window.sessionStorage.removeItem('TOKEN');
						$state.go("app");
					} else {

					}
				},
				function(response) {
					$scope.responseMessage = HttpService.error(response.data,response.status,$scope);
				});
	};
});

// footer page controller
app.controller("footerCtr", function($scope, $location, $state) {
});
