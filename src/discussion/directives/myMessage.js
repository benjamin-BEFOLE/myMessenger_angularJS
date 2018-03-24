/**
* Directive contrôlant le message envoyer par un utilisateur
*
*/
userModule.directive('myMessage', ['$rootScope', 'discussion', function($rootScope, discussionServ) {
	// Runs during compile
	return {
		// name: '',
		scope: false, // {} = isolate, true = child, false/undefined = no change
		restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, element, attrs) {
			
			function autoHeight(elm) {
				var lineHeight = 16;

				// Si l'élément ne se déplace pas vers le haut
			    if (!elm.scrollTop) {
					do {
			            elm.style.height = (elm.scrollHeight - lineHeight) + 'px';
			        } while (elm.offsetHeight == elm.scrollHeight);
			    }

			    var height = elm.scrollHeight
			    elm.style.height = height + 'px';
			    document.getElementsByClassName('l-msg')[0].style.height = height + 'px';
			    document.getElementsByClassName('l-wrap-send-msg')[0].style.height = (height+20) + 'px';
			}

			// EVENEMENT: saisi message
			element.bind('keyup', function (event) {
				if (event.code == 'Enter' && !event.shiftKey) {
					var message = $scope.message;
					var test = message.replace(/\n/g, '');

					if (test) {
						var data = {
							id: $scope.$storage.id,
							contactId: $scope.dataContact.id,
							message: message.replace(/\n/g, '<br>')
						}

						// On envoie le message au serveur 
						discussionServ.send(data, $scope.$storage.token)
							.then(
								// Succès
								function (resp) {
									$rootScope.$broadcast('message', resp.data);
									$rootScope.$broadcast('notification', resp.data, 0);
								},
								// Erreur
								function (resp) {
									if (resp.status == 401) {
										$scope.deconnexion(); 	// Déconnexion de l'utilisateur
									}
									console.log('message non envoyé')
							});
					}

					$scope.message = '';
					element[0].value = '';
				}

				autoHeight(event.target);
			})
		}
	};
}]);