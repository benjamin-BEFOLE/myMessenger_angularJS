/**
* Controller s'occupant de l'affichage des messages
*
*/
discussionModule.controller('screenDiscussionCtrl', 
	['$scope', '$sessionStorage', 'time', 'discussion', 'SERVER_URL', 'displayMsg', 
	function($scope, $sessionStorage, timeServ, discussionServ, SERVER_URL, displayMsgServ) {
		$scope.isHidden = true;
		var userId = $sessionStorage.id;
		var token = $sessionStorage.token;
		var elementScreen = angular.element(document.getElementById('js-screen'))
		var tabTime = [];

		function autoScrollTop () {
			var elmMsg = document.getElementById('js-screen');
			var elmScreen = document.getElementById('js-wrap-screen');

			var scrollTop = elmMsg.scrollHeight - elmScreen.scrollHeight;
			if (scrollTop > 0) {
				elmMsg.scrollTop = scrollTop;
			}
		}

		function printMsgTime (msgDate) {
			var tmp = timeServ.getTime(new Date(), msgDate, false);

			if (tabTime.indexOf(tmp) == -1)
			{
				var elmHtml = displayMsgServ.componentMsgTime(tmp.toUpperCase());
				elementScreen.append(elmHtml);
				tabTime.push(tmp);
			}
		}

		// Ecouteurs d'événements
		$scope.$on('contactSelected', function (event, dataContact) {
			$scope.isHidden = false;
			tabTime = [];						// On supprime les anciennes données	
			elementScreen[0].innerHTML = '';	// On supprime les anciennes données

			// Requête serveur
			discussionServ.getAllMessages(userId, dataContact.id, token)
				.then(
					// Succès
					function (resp) {
						var date = new Date();
						var msgNonLu = false;
						var elmHtml = '';

						resp.data.forEach(function(elm) {
							date.setTime(elm.date);
							printMsgTime (date);

							if (userId == elm.emitter_id){
								elmHtml = displayMsgServ.componentMsgEmitted(elm.message, timeServ.getHours(date));
								elementScreen.append(elmHtml);
							}
							else {
								if (!elm.status) {
									if (!msgNonLu) {
										elementScreen.append(displayMsgServ.componentMsgNonLu());
										msgNonLu = true;
									}
									// Requête serveur: mise à jour statut
									discussionServ.updateStatus(userId, elm.id, token);
								}
								elmHtml = displayMsgServ.componentMsgReceived(elm.message, timeServ.getHours(date));
								elementScreen.append(elmHtml);
							}
						});
						autoScrollTop();
					},
					// Erreur
					function (resp) {
						if (resp.status == 401) {
							$scope.deconnexion(); 	// Déconnexion de l'utilisateur
						}
						console.log('erreur affichage messages');
				});
		})

		$scope.$on('message', function (event, dataMsg) {
			var date = new Date();
			date.setTime(dataMsg.date);

			if (dataMsg.emitter_id == userId) 
				var elmHtml = displayMsgServ.componentMsgEmitted(dataMsg.message, timeServ.getHours(date));
			
			else {
				var elmHtml = displayMsgServ.componentMsgReceived(dataMsg.message, timeServ.getHours(date));
				// Requête serveur: mise à jour statut
				discussionServ.updateStatus(userId, dataMsg.id, token);
			}
			
			// On affiche le message envoyé par l'utilisateur
			printMsgTime(date);
			elementScreen.append(elmHtml);
			autoScrollTop();
		})
}])