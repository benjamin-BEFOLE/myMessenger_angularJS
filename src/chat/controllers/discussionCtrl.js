/**
* Controller s'occupant du chat 'discussion'
*
*/
chatModule.controller('chatDiscussionCtrl', 
	['$rootScope', '$scope', '$sessionStorage', 'serviceChatDiscussion', 'time', 'AVATAR_URL', 
	function($rootScope, $scope, $sessionStorage, chatServ, timeServ, AVATAR_URL) {
		var id = $sessionStorage.id;
		var token = $sessionStorage.token;
		$scope.search = '';
		$scope.data = [];
		$scope.error = true;

		// EVENEMENT: click sur le boutton 'recherche'
		$scope.find = function (chaine) {
			chaine = (chaine)?chaine:0;
			chatServ.getLastMsg(id, token, chaine)
				.then(
					// Succès
					function (resp) {
						$scope.error = false;
						$scope.data = [];

						resp.data.forEach(function(elm) {
							if (elm) {
								var path = AVATAR_URL + elm.contact.avatarName + '?' + Date.now();
								var time = new Date();
								time.setTime(elm.message.date);
								
								$scope.data.push({
									contact: {
										id: elm.contact.id,
										name: elm.contact.name,
										avatarPath: path,
										avatarClass: elm.contact.avatarClass
									},
									message: elm.message.message.replace(/<br>/g, '\n'),
									date: elm.message.date,
									time: timeServ.getTime(new Date(), time, true),
									nbrMsgNonLu: elm.nbrMsgNonLu,
									classe: (elm.nbrMsgNonLu)?'':'is-hidden'
								})
							}
						});
						$scope.data = $scope.data.sort(function (a, b) {
															return b.date - a.date;
						});
					},
					// Erreur
					function (resp) {
						if (resp.status == 401) {
							$scope.deconnexion(); 	// Déconnexion de l'utilisateur
						}

						$scope.error = true;
						$scope.data = [];
						$scope.msgError = 'Aucun résultat';
				});
		}

		// EVENEMENT: sélection d'un contact
		$scope.select = function (index) {
			$scope.data[index].nbrMsgNonLu = 0;
			$scope.data[index].classe = 'is-hidden';
			$rootScope.$broadcast('contactSelected', $scope.data[index].contact);
		}

		// EVENEMENT: saisi d'une recherche
		$scope.$watch('search', function (value) {
			$scope.find(value);
		})

		// Ecouteurs d'événements
		$scope.$on('notification', function (event, dataMsg, incr) {
			var time = new Date();
			$scope.data.forEach(function (elm) {
				if (elm.contact.id == dataMsg.receiver_id || elm.contact.id == dataMsg.emitter_id) {
					time.setTime(dataMsg.date);
					elm.message = dataMsg.message.replace(/<br>/g, '\n');
					elm.date = dataMsg.date;
					elm.time = timeServ.getTime(new Date(), time, true);
					if (incr) {
						elm.nbrMsgNonLu++;
						elm.classe = '';
					}
				}
			})
			if (dataMsg.receiver_id == id)
				$scope.$digest();
		})
}])