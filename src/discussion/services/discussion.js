/**
* Service gérant les données d'un utilisateur
*
*/
discussionModule.service('discussion', ['$http', 'API_URL', 
	function($http, API_URL) {
		
		this.send = function (data, token) {
			var url = API_URL + 'discussion/' + data.id + '/message';
			// Envoie des données à l'API
			return $http.post(url, data, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.getAllMessages = function (userId, contactId, token) {
			var url = API_URL + 'discussion/' + userId + '/all-messages/' + contactId;
			// Envoie des données à l'API
			return $http.get(url, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};

		this.updateStatus = function (userId, messageId, token) {
			var url = API_URL + 'discussion/' + userId + '/message/' + messageId + '/update-status';
			// Envoie des données à l'API
			return $http.put(url, {}, {
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});
		};
}])