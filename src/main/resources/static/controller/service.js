// ******************************
//   service method
// ******************************
var service = angular.module('service',['ui.router']);


service.service('HttpService', function($http, $window, $location, $state, $rootScope){
	
	this.get = function(path){
		var token = $window.sessionStorage.getItem('TOKEN');
		if(token != null) {
			$http.defaults.headers.common['Authorization'] = 'Token ' + token;
		}

		return $http({
			method : 'GET',
			url : path,
//			timeout : 3000
		});
	}
	
	this.post = function(path, data){
		var token = $window.sessionStorage.getItem('TOKEN');
		if(token != null) {
			$http.defaults.headers.common['Authorization'] = 'Token ' + token;
		}
		$http.defaults.headers.common['Content-Type'] = 'application/json';

		return $http({
			method : 'POST',
			url : path,
			data : data,
//			headers : {
//				'Content-Type' : 'application/json'
//			}
		});
	}
	
	this.error = function(response,status,contextScope){
		console.log(response);
		if(status == 401){
			$state.go("app");
		} else if(status == 403){
			$state.go("app.noPermission");
		} else if(status == 500 || status == 405 || status == 404 ){
			$state.go("app.error");
		} else if(status == 400){
			var errorData = angular.fromJson(response);
			contextScope.errorData = errorData.errors;
		}
	}

});



