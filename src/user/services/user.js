/**
* Service gérant les données d'un utilisateur
*
*/
userModule.service('user', ['$http', 'API_URL', function($http, API_URL) {
	this.data = {};
	// this.msgErr = {};

	this.signUp = function (user) {
		// Envoie des données à l'API
		return $http.post(API_URL + 'sign-up', user.data);
	};

	this.login = function (user) {
		// Envoie des données à l'API
		return $http.post(API_URL + 'login', user.data);
	};

	this.upload = function (data) {
		var url = API_URL + 'user/' + data.id + '/avatar';
		// Envoie des données à l'API
		return $http.put(url, data.image, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
       	});
	};

}])