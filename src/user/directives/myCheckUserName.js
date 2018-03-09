/**
* Directive contrôlant le nom de l'utilisateur
*
*/
userModule.directive('myCheckUserName', ['checkUserData', function(serv) {
	// Runs during compile
	return {
		// name: '',
		scope: false, // {} = isolate, true = child, false/undefined = no change
		restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, elm, attrs) {
			var bool = false;

			$scope.$watch('userName', function(newValue, oldValue){
				if (bool)
					$scope.userNameError = serv.checkuserName($scope.userName);

				else if (newValue.length >= 1)
				{
					bool = true;
					$scope.userNameError = serv.checkuserName($scope.userName);
				}

				if ($scope.userNameError == '')
					$scope.userNameClass = '';
				else 
					$scope.userNameClass = 'th-border-warning';
			});
		}
	};
}]);

