
userModule.controller('homeHeaderCtrl', ['$scope', '$sessionStorage', function($scope, $sessionStorage){
	// Données session
	$scope.$storage = $sessionStorage;

	$scope.menuIsHidden = true;

	var elmSearch = angular.element(document.getElementsByClassName('js-search'));
	var elmSearchResult = angular.element(document.getElementsByClassName('js-search-result'));

	var elmChatNewContact = angular.element(document.getElementById('new-contact'));
	var elmChatContact = angular.element(document.getElementById('contact'));
	var elmChatDiscussion = angular.element(document.getElementById('discussion'));

	// EVENEMENT: click sur le boutton menu
	$scope.menu = function () {
		var height = 175;

		// Si le menu est masqué
		if ($scope.menuIsHidden) {
			// On affiche le menu
			$scope.menuIsHidden = false;

			elmSearch.css({
				'margin-top' : height + 'px'
			});

			elmSearchResult.css({
				'height' : 'calc(100vh - ' + (height + 110) + 'px)'
			});
		}

		else {
			// On masque le menu 
			$scope.menuIsHidden = true;

			elmSearch.css({
				'margin-top' : '0px'
			});

			elmSearchResult.css({
				'height' : 'calc(100vh - 110px)'
			});
		}
	}

	// EVENEMENT: click sur le boutton 'menu-new-contact'
	$scope.showNewContact = function () {
		if (elmChatNewContact.hasClass('is-hidden')) {
			// On affiche le chat 'new-contact'
			elmChatNewContact.removeClass('is-hidden');

			// On masque les autres chat
			if (!elmChatContact.hasClass('is-hidden'))
				elmChatContact.addClass('is-hidden')

			if (!elmChatDiscussion.hasClass('is-hidden'))
				elmChatDiscussion.addClass('is-hidden')
		}
	}

	// EVENEMENT: click sur le boutton 'menu-contact'
	$scope.showContact = function () {
		if (elmChatContact.hasClass('is-hidden')) {
			// On affiche le chat 'contact'
			elmChatContact.removeClass('is-hidden');

			// On masque les autres chat
			if (!elmChatNewContact.hasClass('is-hidden'))
				elmChatNewContact.addClass('is-hidden')

			if (!elmChatDiscussion.hasClass('is-hidden'))
				elmChatDiscussion.addClass('is-hidden')
		}
	}

	// EVENEMENT: click sur le boutton 'menu-discussion'
	$scope.showDiscussion = function () {
		if (elmChatDiscussion.hasClass('is-hidden')) {
			// On affiche le chat 'discussion'
			elmChatDiscussion.removeClass('is-hidden');

			// On masque les autres chat
			if (!elmChatNewContact.hasClass('is-hidden'))
				elmChatNewContact.addClass('is-hidden')

			if (!elmChatContact.hasClass('is-hidden'))
				elmChatContact.addClass('is-hidden')
		}
	}
}]);