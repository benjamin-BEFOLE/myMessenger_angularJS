/**
* Controller s'occupant du profil de l'utilisateur
*
*/
userModule.controller('profilCtrl', ['$scope', '$sessionStorage', 'user', 'AVATAR_URL',
	function($scope, $sessionStorage, userServ, AVATAR_URL){
		if ($sessionStorage.id == undefined || $sessionStorage.email == undefined ||
			$sessionStorage.name == undefined || $sessionStorage.token == undefined ||
			$sessionStorage.avatarPath == undefined || $sessionStorage.avatarClass == undefined) 
		{
			userServ.deconnexion(); 	// Déconnexion de l'utilisateur
		}

		// Données session
		$scope.$storage = $sessionStorage;

		// Données utilisateur modifiées
		$scope.name = '';
		$scope.email = '';
		$scope.password1 = '';
		$scope.password2 = '';

		// Messages 
		$scope.nameError = '';
		$scope.emailError = '';
		$scope.passwordError = '';
		$scope.avatarError = '';
		$scope.nameOk = '';
		$scope.emailOk = '';
		$scope.passwordOk = '';
		$scope.avatarOk = '';

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
			$scope.password1 = '';
			$scope.password2 = '';

			// Messages 
			$scope.nameError = '';
			$scope.emailError = '';
			$scope.passwordError = '';
			$scope.avatarError = '';
			$scope.nameOk = '';
			$scope.emailOk = '';
			$scope.passwordOk = '';
			$scope.avatarOk = '';

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
			userServ.setAvatar(data, $scope.$storage.token)
				.then(
					// Succès 
					function (resp) {
						$sessionStorage.avatarPath = AVATAR_URL + resp.data.avatar.name + '?' + Date.now();
						$sessionStorage.avatarClass = resp.data.avatar.class;
						$scope.$storage = $sessionStorage; // Données session
						$scope.avatarOk = 'bien modifié';
						$scope.avatarError = '';
						// console.log(resp.data.avatar);
					},

					// Echec
					function (resp) {
						if (resp.status == 401) {
							userServ.deconnexion(); 	// Déconnexion de l'utilisateur
						}

						$scope.avatarOk = '';
						$scope.avatarError = resp.data.msgError;
						console.log(status);
					});
		})

		// EVENEMENT: click sur le bouton "delete-avatar"
		$scope.delete = function () {
			if ($scope.$storage.avatarPath.indexOf('default.png') == -1) {
				// Modification avatar
				userServ.setAvatarDefault($scope.$storage.id, $scope.$storage.token)
					.then(
						// Succès 
						function (resp) {
							$sessionStorage.avatarPath = AVATAR_URL + resp.data.avatar.name + '?' + Date.now();
							$sessionStorage.avatarClass = resp.data.avatar.class;
							$scope.$storage = $sessionStorage; // Données session
							$scope.avatarOk = 'bien modifié';
							$scope.avatarError = '';
							// console.log(resp.data.avatar);
						},

						// Echec
						function (resp) {
							if (resp.status == 401) {
								userServ.deconnexion(); 	// Déconnexion de l'utilisateur
							}

							$scope.avatarOk = '';
							$scope.avatarError = 'Erreur serveur';
							// console.log(resp);
						});
			}
		}

		// EVENEMENT: click sur le bouton enregistrer
		$scope.submit = function () {
			if ($scope.$storage.name != $scope.name) {
				// Modification nom 
				userServ.setName($scope.$storage.id, $scope.name, $scope.$storage.token)
					.then(
						// Succès 
						function (resp) {
							$sessionStorage.name = resp.data.name;
							$scope.nameOk = 'bien modifié';
							$scope.nameError = '';
							// console.log(resp.data);
						},

						// Echec
						function (resp) {
							if (resp.status == 401) {
								userServ.deconnexion(); 	// Déconnexion de l'utilisateur
							}

							$scope.nameOk = '';
							$scope.nameError = resp.data.msgError;
							// console.log(resp.data);
						});
			}

			if ($scope.$storage.email != $scope.email) {
				// Modification email 
				userServ.setEmail($scope.$storage.id, $scope.email, $scope.$storage.token)
					.then(
						// Succès 
						function (resp) {
							$sessionStorage.email = resp.data.email;
							$scope.emailOk = 'bien modifié';
							$scope.emailError = '';
							// console.log(resp.data);
						},

						// Echec
						function (resp) {
							if (resp.status == 401) {
								userServ.deconnexion(); 	// Déconnexion de l'utilisateur
							}

							$scope.emailOk = '';
							$scope.emailError = resp.data.msgError;
							// console.log(resp.data);
						});
			}

			if ($scope.password1 != '' || $scope.password2 != '') {
				// Modification mot de passe 
				userServ.setNewPassword($scope.$storage.id, $scope.password1, $scope.password2, $scope.$storage.token)
					.then(
						// Succès 
						function (resp) {
							$scope.passwordOk = 'bien modifié';
							$scope.passwordError = '';
							// console.log(resp.data);
						},

						// Echec
						function (resp) {
							if (resp.status == 401) {
								userServ.deconnexion(); 	// Déconnexion de l'utilisateur
							}

							$scope.passwordOk = '';
							$scope.passwordError = resp.data.msgError;
							// console.log(resp.data);
						});
			}

			if ($scope.password1 == '' && $scope.password2 == '') {
				$scope.passwordOk = '';
				$scope.passwordError = '';
			}

			// Données session
			$scope.$storage = $sessionStorage;
			// console.log($sessionStorage);
		}
}]);
