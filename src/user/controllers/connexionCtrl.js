/**
* Controller s'occupant des données de connexion de l'utilisateur
*
*/
userModule.controller('connexionCtrl', ['$scope', '$location', 'checkUserData', 'user',
	function($scope, $location, ckeckData, userServ){
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
				userServ.data.email = $scope.email;
				userServ.data.password = $scope.password;

				// Envoie des données à l'API
				userServ.login(userServ).
					then(
						// Succès 
						function (resp, status) {
							userServ.data = resp.data.user;
							console.log(userServ.data);

							// Redirection
							// $location.path('/user/' );
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

							console.log(resp.data.msg);
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