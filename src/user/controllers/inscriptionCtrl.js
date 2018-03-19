/**
* Controller s'occupant des données d'inscription de l'utilisateur
*
*/
userModule.controller('inscriptionCtrl', 
	['$scope', '$sessionStorage', '$location', 'checkUserData', 'user',
	function($scope, $sessionStorage, $location, ckeckData, userServ){
		$scope.email = '';
		$scope.emailError = '';
		$scope.userName = '';
		$scope.userNameError = '';
		$scope.password = '';
		$scope.passwordError = '';

		$scope.sendForm = function () {
			// Contrôle des données
			$scope.emailError = ckeckData.checkEmail($scope.email);
			$scope.userNameError = ckeckData.checkuserName($scope.userName);
			$scope.passwordError = ckeckData.checkPassword($scope.password);

			// Les données sont invalides
			if ($scope.emailError == '' && $scope.userNameError == '' && $scope.passwordError == '')
			{
				userServ.data.email = $scope.email;
				userServ.data.name = $scope.userName;
				userServ.data.password = $scope.password;

				// Envoie des données à l'API
				userServ.signUp(userServ).
					then(
						// Succès 
						function (resp, status) {
							userServ.data = resp.data.user;
							$sessionStorage.id = resp.data.user.id;
							$sessionStorage.name = resp.data.user.name;
							$sessionStorage.email = resp.data.user.email;
							$sessionStorage.token = resp.data.user.token;
							$sessionStorage.avatarPath = resp.data.user.avatarPath;
							$sessionStorage.avatarClass = resp.data.user.avatarClass;

							// Redirection vers la page de profil
							$location.path('/user/' + userServ.data.id + '/profil');
						},
						// Echec
						function (resp, status) {
							$scope.emailError = resp.data.msg.emailError;
							$scope.userNameError = resp.data.msg.nameError;
							$scope.passwordError = resp.data.msg.passwordError;
				});
			}
		}
}])
