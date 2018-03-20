
userModule.controller('userHomeCtrl', ['$scope', '$sessionStorage', 'user', 
	function($scope, $sessionStorage, userServ){
		// Si utilisateur non identifié
		if ($sessionStorage.id == undefined || $sessionStorage.email == undefined ||
				$sessionStorage.name == undefined || $sessionStorage.token == undefined ||
				$sessionStorage.avatarPath == undefined || $sessionStorage.avatarClass == undefined) 
		{
			userServ.deconnexion(); 	// Déconnexion de l'utilisateur
		}

		// EVENEMENT: click sur le boutton 'menu-deconnexion'
		$scope.deconnexion = function () {
			userServ.deconnexion(); 	// Déconnexion de l'utilisateur
		}
}]);
