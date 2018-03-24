/**
* Service lié au 'chat-contact'
*
*/
userModule.service('serviceChatContact', ['$http', 'API_URL', function($http, API_URL) {
	this.getList = function (id, token, chaine) {
		var url = API_URL + 'chat/' + id + '/contact/' + chaine;
		// Envoie des données à l'API
		return $http.get(url, {headers: {
							'Authorization': 'Bearer ' + token
					}});
	}
}]);