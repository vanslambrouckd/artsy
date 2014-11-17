var app = {
	init: function() {
		/*
		var opts = {
			el: $('#jsMytasks').parent().find('.popup'),
			naam: 'item1',
			position: {
				my: 'right'
			}
		}

		$('#jsMytasks > i').Popupmenu(opts);
		//inst.show();
		//console.log(inst.settings.naam);
		
		var opts = {
			el: $('#jsInbox').parent().find('.popup'),
			naam: 'item1',
		}

		$('#jsInbox > i').Popupmenu(opts);

		*/
		$('#jsDownload').Popupmenu({
			el: $('#popupDownload'),
			position: {
				my: 'top center',
				at: 'bottom center'
			},
			target: $('#menu')
		});
	}
}