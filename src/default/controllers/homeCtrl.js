/**
* Controller s'occupant des pages d'accueil par défaut
*
*/
userModule.controller('homeCtrl', ['$scope', '$window', function($scope, $window){
	// Elements angular
	var elmWindow = angular.element($window);
	var elmMenu = angular.element(document.getElementById("menu"));
	var elmBody = angular.element(document.getElementById("body"));

	// Variables
	$scope.isHidden = true;
	var height = 175;
	var isMedium = ($window.innerWidth < 768);
	
	// EVENEMENT: 'click' sur le boutton menu
	$scope.printMenu = function () {
		if ($scope.isHidden)
		{
			// On affichhe le menu
			$scope.isHidden = false;

			// On modifie la marge du corps de la page
			elmBody.css({
				'margin-top' : height + 'px'
			});
		}
		else
		{
			// On cache le menu
			$scope.isHidden = true;

			// On modifie la marge du corps de la page
			elmBody.css({
				'margin-top' : '0px'
			});
		}
	}

	// EVENEMENT: 'resize' de la fenêtre
	elmWindow.bind('resize', function() {
		if($window.innerWidth < 768 && !isMedium)
			isMedium = true;

		if($window.innerWidth >= 768 && isMedium)
		{
			isMedium = false;

			// On cache le menu
			if(!$scope.isHidden)
			{
				// On cache le menu
				$scope.isHidden = true;

				// On modifie la marge du corps de la page
				elmBody.css({
					'margin-top' : '0px'
				});
			}
		}

		$scope.$digest();
	});
}]);
