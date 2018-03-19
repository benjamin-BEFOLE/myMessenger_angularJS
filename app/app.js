/**
*  Module 'myMessenger'
*
* Description Module principal de l'application
*/
var appModule = angular.module(
	// Nom du module
	'myMessenger', 
	// Dépendances
	['ngRoute',
	'user'
]);


/**
*  Module 'user'
*
* Description Contrôle et gère les données des utilisateurs
*/
var userModule = angular.module(
	// Nom du module
	'user', 
	// Dépendances
	['ngResource',
	'ngStorage'
]);


/**
*  Définition de quelques constantes
*
*/
userModule.constant('API_URL', 'http://localhost:6060/api/v0/');
userModule.constant('AVATAR_URL', 'http://localhost:6060/img/avatar/');  

