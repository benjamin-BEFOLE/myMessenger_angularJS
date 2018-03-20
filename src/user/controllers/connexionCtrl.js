/**
* Controller s'occupant des données de connexion de l'utilisateur
*
*/
userModule.controller('connexionCtrl', 
	['$scope', '$sessionStorage', '$location', 'checkUserData', 'user', 'AVATAR_URL',
	function($scope, $sessionStorage, $location, ckeckData, userServ, AVATAR_URL){
		if ($sessionStorage.id != undefined && $sessionStorage.email != undefined &&
			$sessionStorage.name != undefined && $sessionStorage.token != undefined &&
			$sessionStorage.avatarPath != undefined && $sessionStorage.avatarClass != undefined) 
		{
			// Redirection vers la page de profil
			$location.path('/user/' + $sessionStorage.id + '/profil');
		}

		$scope.email = '';
		// $scope.emailError = 'emailError';
		$scope.password = '';
		// $scope.passwordError = '';

		$scope.sendForm = function () {
			// Contrôle des données
			$scope.emailError = ckeckData.checkEmail($scope.email);
			$scope.passwordError = ckeckData.checkPassword($scope.password);

			// Les données sont valides
			if ($scope.emailError == '' && $scope.passwordError == '')
			{
				// Envoie des données à l'API
				userServ.login($scope.email, $scope.password)
					.then(
						// Succès 
						function (resp, status) {
							$sessionStorage.id = resp.data.user.id;
							$sessionStorage.name = resp.data.user.name;
							$sessionStorage.email = resp.data.user.email;
							$sessionStorage.token = resp.data.user.token;
							$sessionStorage.avatarPath = AVATAR_URL + resp.data.user.avatarName + '?' + Date.now();
							$sessionStorage.avatarClass = resp.data.user.avatarClass;
							// console.log($sessionStorage);

							// Redirection vers la page de profil
							$location.path('/user/' + resp.data.user.id + '/profil');
						},
						// Echec
						function (resp, status) {
							if (resp.data.msg.emailError != '')
							{
								$scope.email = '';
								$scope.password = '';
							}

							else
								$scope.password = '';

							// console.log(resp.data.msg);
					});
			}

			// Les données sont invalides
			else if ($scope.emailError != '')
			{
				$scope.email = '';
				$scope.password = '';
			}

			// Les données sont invalides
			else
				$scope.password = '';
		}
}])