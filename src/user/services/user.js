/**
* Service gérant les données d'un utilisateur
*
*/
userModule.service('user', ['$http', '$location', '$sessionStorage', 'API_URL', 
	function($http, $location, $sessionStorage, API_URL) {
		this.data = {};

		this.signUp = function (user) {
			// Envoie des données à l'API
			return $http.post(API_URL + 'sign-up', user.data);
		};

		this.login = function (email, password) {
			var url = API_URL + 'login/email/' + email + '/password/' + password;
			// Envoie des données à l'API
			return $http.get(url);
		};

		this.setName = function (id, name, token) {
			var url = API_URL + 'user/' + id + '/name/' + name;
			// Envoie des données à l'API
			return $http.put(url, {}, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.setEmail = function (id, email, token) {
			var url = API_URL + 'user/' + id + '/email/' + email;
			// Envoie des données à l'API
			return $http.put(url, {}, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.setNewPassword = function (id, password1, password2, token) {
			var url = API_URL + 'user/' + id + '/password';
			// Envoie des données à l'API
			return $http.put(url, {
						password1: password1,
						password2: password2
					}, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.setAvatar = function (data, token) {
			var url = API_URL + 'user/' + data.id + '/avatar';
			// Envoie des données à l'API
			return $http.put(url, data.image, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined,
					'Authorization': 'Bearer ' + token
				}
	       	});
		};

		this.setAvatarDefault = function (id, token) {
			var url = API_URL + 'user/' + id + '/avatar/default';
			// Envoie des données à l'API
			return $http.put(url, {}, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.deconnexion = function () {
			// Fermeture de la session 
			$sessionStorage.$reset();

			// Redirection vers la page de connexion 
			$location.path('/connexion');
		}
}])