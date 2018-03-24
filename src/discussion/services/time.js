/**
* Service gérant les données d'un utilisateur
*
*/
discussionModule.service('time', [function(){
	this.getTime = function (newDate, oldDate, bool) {
		var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
		var mois = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décembre");
		var time = '';

		if (newDate.getFullYear() == oldDate.getFullYear() &&
			 newDate.getMonth() == oldDate.getMonth() &&
			 newDate.getDate() == oldDate.getDate())
		{
			if (bool)
			{
				var hour = oldDate.getHours();
				var min = oldDate.getMinutes();
				time = (hour >= 10) ? hour : ('0'+hour);
				time += ':';
				time += (min >= 10) ? min : ('0'+min);
			}

			else
				time = "aujourd'hui";
		}

		else if ((newDate.getDate() - oldDate.getDate()) == 1)
			time = 'hier';

		else if ((newDate.getDate() - oldDate.getDate()) < 7 &&
			newDate.getDate() >= oldDate.getDate())
		{
			time = jours[oldDate.getDay()];
		}

		else if (newDate.getFullYear() == oldDate.getFullYear() &&
			newDate.getMonth() >= oldDate.getMonth())
		{
			time = mois[oldDate.getMonth()];
		}

		else
		{
			var date = oldDate.getDate();
			var month = oldDate.getMonth();
			time = (date >= 10) ? date : ('0'+date); 
			time += '/';
			time += (month >= 10) ? month : ('0'+month); 
			time += '/' + oldDate.getFullYear();
		}

	    return time;
	}

	this.getHours = function (date) {
		var hour = date.getHours();
		var min = date.getMinutes();
		time = (hour >= 10) ? hour : ('0' + hour);
		time += ':';
		time += (min >= 10) ? min : ('0' + min);

	    return time;
	}
}])