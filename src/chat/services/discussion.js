/**
* Service lié au 'chat-discussion'
*
*/
userModule.service('serviceChatDiscussion', ['$http', 'API_URL', function($http, API_URL) {
	this.getLastMsg = function (id, token, chaine) {
		var url = API_URL + 'chat/' + id + '/discussion/' + chaine;
		// Envoie des données à l'API
		return $http.get(url, {headers: {
							'Authorization': 'Bearer ' + token
					}});
	}
}]);