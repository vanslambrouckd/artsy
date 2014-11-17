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

		console.log($('#jsMeer')[0].getBoundingClientRect());

		
		console.log($('#jsMytasks').position());

		console.log($('#jsInbox').position());

		console.log($('#jsMeer').position());
*/
		var position_my = ['top', 'center', 'bottom'];
		$.each(position_my, function(i, val) {
			$('#position_my').append('<option value="'+val+'">'+val+'</option>');
		});

		var position_at = ['top', 'center', 'bottom'];
		$.each(position_at, function(i, val) {
			$('#position_at').append('<option value="'+val+'">'+val+'</option>');
		});

		$('#position_at').on('change', function(event) {
			app.initPopups();
		});

		//app.initPopups();
		
		//console.log(inst);


		$(window).resize(function() {
			//inst.reposition();
		});
	},
	initPopups: function() {
		var inst = $('#jsDownload').Popupmenu({
			el: $('#popupDownload'),
			position: {
				my: $('#position_my').val() + ' center',
				at: $('#position_at').val() + ' center'
			},
			target: $('#jsDownload')
		});

		$('#jsMeer').Popupmenu({
			el: $('#popupMeer'),
			target: $('#popupDownload'),
			position: {
				my: $('#position_my').val() + ' center',
				at: $('#position_at').val() + ' center'
			}
		});
	}
}