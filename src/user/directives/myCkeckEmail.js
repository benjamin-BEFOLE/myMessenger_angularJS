/**
* Directive contrôlant le mot de passe de l'utilisateur
*
*/
userModule.directive('myCheckEmail', ['checkUserData', function(serv) {
	// Runs during compile
	return {
		// name: '',
		scope: false, // {} = isolate, true = child, false/undefined = no change
		restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, elm, attrs) {
			var bool = false;

			$scope.$watch('email', function(newValue, oldValue){
				if (bool)
					$scope.emailError = serv.checkEmail($scope.email);

				else if (newValue.length >= 7)
				{
					bool = true;
					$scope.emailError = serv.checkEmail($scope.email);
				}

				if ($scope.emailError == '')
					$scope.emailClass = '';
				else 
					$scope.emailClass = 'th-border-warning';
			});
		}
	};
}]);

