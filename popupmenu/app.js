var app = {
	init: function() {
		var opts = {
			el: $('#size .popup'),
			container: $('#size'),
			naam: 'item1',
		}

		var inst = $('#size > a i').Popupmenu(opts);
		//inst.show();
		//console.log(inst.settings.naam);
		
		var opts = {
			el: $('#size2 .popup'),
			container: $('#size2'),
			naam:'item2',
			show: {
				event: 'mouseenter'
			}
		}
		var inst2 = $('#size2 > a i').Popupmenu(opts);
		

		$('#size2 a').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			alert('ja');
		});

		var opts = {
			//el: $('#jsMytasks').parent().find('.popup')
			//container: $('#menu > ul > li:first-child');
		}

		var inst3 = $('#jsMytasks i').Popupmenu(opts);		
	}
}