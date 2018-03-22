/**
* Controller s'occupant du chat 'new-contact'
*
*/
chatModule.controller('chatNewContact', ['$scope', '$sessionStorage', 'serviceChatNewContact', 'AVATAR_URL', 
	function($scope, $sessionStorage, service, AVATAR_URL){
		var id = $sessionStorage.id;
		var token = $sessionStorage.token;
		$scope.search = '';
		$scope.data = [];
		$scope.error = true;

		// EVENEMENT: click sur le boutton 'recherche'
		$scope.find = function (chaine) {
			service.find(id, token, chaine)
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
								avatarClass: element.avatarClass,
								bool: true
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

		// EVENEMENT: click sur le boutton 'ajout contact'
		$scope.add = function (index) {
			// On masque 
			$scope.data[index].bool = false;

			// Requête pour ajouter contact
			service.add($scope.data[index].id, $sessionStorage.id, $sessionStorage.token)
				.then(
					// Succès
					function (resp) {
					}, 
					// Erreur
					function (resp) {
						if (resp.status == 401) {
							$scope.deconnexion(); 	// Déconnexion de l'utilisateur
						}
					});
		}

		// EVENEMENT: saisi d'une recherche
		$scope.$watch('search', function (value) {
			if(value == '') {
				$scope.error = true;
				$scope.data = [];
				$scope.msgError = 'Saisir une recherche';
			}
			else 
				$scope.find(value);
		})
}])