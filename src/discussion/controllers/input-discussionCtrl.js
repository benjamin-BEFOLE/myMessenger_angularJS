/**
* Controller s'occupant des messages saisis
*
*/
discussionModule.controller('inputDiscussionCtrl', 
	['$rootScope', '$scope', '$sessionStorage', 'SERVER_URL',  
	function($rootScope, $scope, $sessionStorage, SERVER_URL){
		$scope.$storage = $sessionStorage;
		$scope.message = '';
		$scope.isHidden = true;
		$scope.placeholder = '';
		$scope.dataContact = {};

		// Connection au serveur
		var socket = io.connect(SERVER_URL);

		// Ecouteurs d'événements
		socket.on('messageTo' + $scope.$storage.id, function (dataMsg) {
			if (!$scope.isHidden && dataMsg.emitter_id == $scope.dataContact.id) {
				$rootScope.$broadcast('message', dataMsg);
				$rootScope.$broadcast('notification', dataMsg, 0);
			}

			else 
				$rootScope.$broadcast('notification', dataMsg, 1);
		})

		$scope.$on('contactSelected', function (event, dataContact) {
			$scope.isHidden = false;
			$scope.placeholder = 'écrire à @' + dataContact.name;
			$scope.dataContact = dataContact;
		})
}])