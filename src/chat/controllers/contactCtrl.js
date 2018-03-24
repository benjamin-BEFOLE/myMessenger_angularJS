/**
* Controller s'occupant du chat 'contact'
*
*/
chatModule.controller('chatContactCtrl', 
	['$rootScope', '$scope', '$sessionStorage', 'serviceChatContact', 'AVATAR_URL', 
	function($rootScope, $scope, $sessionStorage, service, AVATAR_URL) {
		var id = $sessionStorage.id;
		var token = $sessionStorage.token;
		$scope.search = '';
		$scope.data = [];
		$scope.error = true;

		// EVENEMENT: click sur le boutton 'recherche'
		$scope.find = function (chaine) {
			chaine = (chaine)?chaine:0;
			service.getList(id, token, chaine)
				.then(
					// Succès
					function (resp) {
						$scope.error = false;
						$scope.data = [];

						resp.data.forEach(function(element) {
							var path = AVATAR_URL + element.avatarName + '?' + Date.now();
							$scope.data.push({
								id: element.id,
								name: element.name,
								avatarPath: path,
								avatarClass: element.avatarClass
							})
						});
					},
					// Erreur
					function (resp) {
						if (resp.status == 401) {
							$scope.deconnexion(); 	// Déconnexion de l'utilisateur
						}

						$scope.error = true;
						$scope.data = [];
						$scope.msgError = 'Aucun résultat';
				});
		}

		// EVENEMENT: sélection d'un contact
		$scope.select = function (index) {
			$rootScope.$broadcast('contactSelected', $scope.data[index]);
		}

		// EVENEMENT: saisi d'une recherche
		$scope.$watch('search', function (value) {
			$scope.find(value);
		})
}])