/**
* Service lié au 'chat-new-contact'
*
*/
userModule.service('serviceChatNewContact', ['$http', 'API_URL', function($http, API_URL) {
	this.find = function (id, token, chaine) {
		var url = API_URL + 'chat/' + id + '/new-contact/' + chaine;
		// Envoie des données à l'API
		return $http.get(url, {headers: {
							'Authorization': 'Bearer ' + token
					}});
	}

	this.add = function (contactId, userId, token) {
		var url = API_URL + 'chat/' + userId + '/new-contact';
		// Envoie des données à l'API
		return $http.post(url, {
							userId: userId,
							contactId: contactId
						}, {
								headers: {
								'Authorization': 'Bearer ' + token
				}});
	}
}]);