/**
* Controller s'occupant du profil de l'utilisateur
*
*/
userModule.controller('profilCtrl', ['$scope', '$sessionStorage', 'user', 'AVATAR_URL',
	function($scope, $sessionStorage, userServ, AVATAR_URL){
		// Données session
		$scope.$storage = $sessionStorage;

		// Données utilisateur modifiées
		$scope.name = '';
		$scope.email = '';
		$scope.oldPassword = '';
		$scope.newPassword = '';

		// Messages d'erreur
		$scope.nameError = '';
		$scope.emailError = '';
		$scope.passwordError = '';
		$scope.avatarError = '';

		$scope.btnCancel = false;
		$scope.btnEdit = true;
		$scope.deleteAvatar = false;
		$scope.disabled = true;

		// Elements angular
		elmImgProfil = angular.element(document.getElementById('image-profil'));
		elmInputFile = angular.element(document.getElementById('input-file'));


		// EVENEMENT: click sur le boutton edit
		$scope.edit = function () {
			$scope.btnCancel = true;		// On affiche "button cancel"
			$scope.btnEdit = false;			// On masque "button edit"
			$scope.deleteAvatar = true;		// On affiche "button delete-avatar"
			$scope.disabled = false; 		// On autorise les modifications

			// Données utilisateur modifiées
			$scope.name = $scope.$storage.name;
			$scope.email = $scope.$storage.email;
			
			$scope.pointer = {'cursor': 'pointer'};
		}

		// EVENEMENT: click sur le boutton cancel
		$scope.cancel = function () {
			$scope.btnCancel = false; 		// On masque "button cancel"
			$scope.btnEdit = true; 		 	// On affiche "button edit"
			$scope.deleteAvatar = false;	// On masque "button delete-avatar"
			$scope.disabled = true; 		// On empêche les modifications

			// Données utilisateur modifiées
			$scope.name = '';
			$scope.email = '';
			$scope.oldPassword = '';
			$scope.newPassword = '';

			$scope.pointer = {'cursor': 'default'};
		}

		// EVENEMENT: click sur la photo de profil
		elmImgProfil.bind('click', function () {
			if (!$scope.btnEdit)
				document.getElementById('input-file').click();
		});

		// EVENEMENT: changement de la photo de profil
		elmInputFile.bind('change', function (event) {
			
			var formData = new FormData();
			formData.append('image', event.target.files[0]);

			var data = {
				id: $scope.$storage.id,
				image: formData
			};
			
			// Envoi de l'image à l'API
			userServ.upload(data)
				.then(
					// Succès 
					function (resp, status) {
						$scope.$storage.avatarPath = AVATAR_URL + resp.data.avatar.name + '?' + Date.now();
						$scope.$storage.avatarClass = resp.data.avatar.class;
						$scope.avatarError = resp.data.msgError;
						console.log(resp.data.avatar);
					},

					// Echec
					function (resp, status) {
						$scope.avatarError = resp.data.msgError;
						// console.log(resp.data);
					});
		})
}]);
