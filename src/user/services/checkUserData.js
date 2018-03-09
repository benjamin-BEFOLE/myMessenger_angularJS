/**
* Service contrôlant les données d'un utilisateur
*
*/
userModule.service('checkUserData', [function(){

	/**
	* Contrôle l'email de l'utilisateur
	*
	* @param {String} chaine - Information à analyser
	* @return {String} Une chaine de caractères non vide en cas d'erreur
	*/
	this.checkEmail = function (chaine) {
		var regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

		if (chaine == '')
			return 'Veuillez bien renseigner ce champ';
		else if (regexEmail.test(chaine))
			return '';
		else
			return 'Ce mail n\'est pas valide';
	}

	/**
	* Contrôle le nom de l'utilisateur
	*
	* @param {String} chaine - Information à analyser
	* @return {String} Une chaine de caractères non vide en cas d'erreur
	*/
	this.checkuserName = function (chaine) {
		var regexName = /^[a-zA-Z]+[a-zA-Z ]*$/;

		if (chaine == '')
			return 'Veuillez bien renseigner ce champ';
		else if (regexName.test(chaine))
			return '';
		else
			return 'Ce champ ne doit contenir que des lettres (sans accent)';
	}

	/**
	* Contrôle le mot de passe de l'utilisateur
	*
	* @param {String} chaine - Information à analyser
	* @return {String} Une chaine de caractères non vide en cas d'erreur
	*/
	this.checkPassword = function (chaine) {
		var regexPassword = /^[a-zA-z0-9]+$/;

		if (chaine == '')
			return 'Veuillez bien renseigner ce champ';
		else if (chaine.length < 6)
			return 'Niveau de sécurité insuffisant';
		else if (regexPassword.test(chaine))
			return '';
		else
			return 'Ce mot de passe n\'est pas valide';
	}
}])

