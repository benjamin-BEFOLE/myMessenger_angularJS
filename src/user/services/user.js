/**
* Service gérant les données d'un utilisateur
*
*/
userModule.service('user', ['$http', '$resource', 'API_URL', function($http, $resource, API_URL){
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

}])