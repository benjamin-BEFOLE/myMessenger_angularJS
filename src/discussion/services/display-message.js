/**
* Service affichage message
*
*/
discussionModule.service('displayMsg', [function(){
	this.componentMsgTime = function (time) {
		return 	'<div class="l-msg-time">' +
					'<div class="msg-time-separator">' + time + '</div>' +
				'</div>';		
	}

	this.componentMsgNonLu = function () {
		return 	'<div class="l-msg-non-lu">' +
					'<div class="msg-non-lu">MESSAGE NON LU</div>' +
				'</div>';		
	}

	this.componentMsgReceived = function (msg, hour) {
		return 	'<div class="l-print-msg-received">' +
					'<div class="msg msg-received">' + msg + '</div>' +
					'<div class="msg-meta msg-meta-received">' + hour + '</div>' +
				'</div>';	
	}

	this.componentMsgEmitted = function (msg, hour) {
		return 	'<div class="l-print-msg-emitted">' +
					'<div class="msg msg-emitted">' + msg + '</div>' +
					'<div class="msg-meta msg-meta-emitted">' + hour + '</div>' +
				'</div>';	
	}
}])