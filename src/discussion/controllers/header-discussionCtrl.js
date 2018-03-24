/**
* Controller s'occupant du header des messages
*
*/
discussionModule.controller('headerDiscussionCtrl', ['$scope', function($scope){
	$scope.isHidden = true;
	$scope.avatarPath = '';
	$scope.avatarClass = '';

	// Ecouteurs d'événements
	$scope.$on('contactSelected', function (event, dataContact) {
		$scope.isHidden = false;
		$scope.avatarPath = dataContact.avatarPath;
		$scope.avatarClass = dataContact.avatarClass;
	})
}])