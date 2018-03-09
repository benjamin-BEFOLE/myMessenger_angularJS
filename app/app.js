/**
*  Module 'myMessenger'
*
* Description Module principal de l'application
*/
var appModule = angular.module('myMessenger', [
	// Dépendances
	'ngRoute',
	'user'
]);

/**
*  Définition de quelques constantes
*
*/
appModule.constant('API_URL', 'http://localhost:6060/api/v0/');


/**
*  Module 'user'
*
* Description Contrôle et gère les données des utilisateurs
*/
var userModule = angular.module('user', ['ngResource']);  

