
// Configuration de l'application
appModule.config([
	'$routeProvider', 
	'$locationProvider', 
	function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
            .when('/home',{
            	templateUrl: 'web/view/home.html',
                  controller: 'homeCtrl'
            })
            .when('/functionnalities',{
            	templateUrl: 'web/view/functionalities.html',
                  controller: 'homeCtrl'
            })
            .when('/security',{
            	templateUrl: 'web/view/security.html',
                  controller: 'homeCtrl'
            })
            .when('/inscription',{
            	templateUrl: 'web/view/inscription.html',
            	controller: 'inscriptionCtrl'
            })
            .when('/connexion',{
            	templateUrl: 'web/view/connexion.html',
            	controller: 'connexionCtrl'
            })
            .when('/user/:id/profil',{
            	templateUrl: 'web/view/user-profil.html',
            	controller: 'profilCtrl'
            })
            .otherwise({
            	redirectTo: '/home'
            });
}]);


