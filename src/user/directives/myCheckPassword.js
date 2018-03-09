/**
* Directive contrôlant le mot de passe de l'utilisateur
*
*/
userModule.directive('myCheckPassword', ['checkUserData', function(serv){
	// Runs during compile
	return {
		// name: '',
		scope: false, // {} = isolate, true = child, false/undefined = no change
		restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, elm, attrs) {
			var bool = false;

			$scope.$watch('password', function(newValue, oldValue){
				if (bool)
					$scope.passwordError = serv.checkPassword($scope.password);

				else if (newValue.length >= 1)
				{
					bool = true;
					$scope.passwordError = serv.checkPassword($scope.password);
				}

				if ($scope.passwordError == '')
					$scope.passwordClass = '';
				else 
					$scope.passwordClass = 'th-border-warning';
			});
		}
	};
}]);


