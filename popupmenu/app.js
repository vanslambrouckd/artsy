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
			$('#position_my_vert').append('<option value="'+val+'">'+val+'</option>');
		});

		$('#position_my_vert').val('top');

		var position_at = ['top', 'center', 'bottom'];
		$.each(position_at, function(i, val) {
			$('#position_at_vert').append('<option value="'+val+'">'+val+'</option>');
		});
		$('#position_at_vert').val('bottom');

		/*
		$('#position_at_vert').on('change', function(event) {
			app.initPopups();
		});
		*/

		var position_my_hor = ['left', 'center', 'right'];
		var position_at_hor = ['left', 'center', 'right'];
		$.each(position_at_hor, function(i, val) {
			$('#position_at_hor').append('<option value="'+val+'">'+val+'</option>');
		});
		$('#position_at_hor').val('left');

		$.each(position_my_hor, function(i, val) {
			$('#position_my_hor').append('<option value="'+val+'">'+val+'</option>');
		});
		$('#position_my_hor').val('left');
				
		$('.posSelect').on('change', function(event) {
			$('#jsDownload').Popupmenu('destroy');
			$('#jsMeer').Popupmenu('destroy');
			app.initPopups();
		});
		
		app.initPopups();
		
		$(window).resize(function() {
			//inst.reposition();
		});
	},
	initPopups: function() {
		

		var opts = {
			el: $('#popupDownload'),
			
			position: {
				my: $('#position_my_vert').val() + ' ' + $('#position_my_hor').val(),
				at: $('#position_at_vert').val() + ' ' + $('#position_at_hor').val()
			},
			
			target: $('#jsDownload')
		}
		var inst = $('#jsDownload').Popupmenu(opts);

		var opts = {
			el: $('#popupMeer'),
			target: $('#popupDownload'),
			position: {
				my: $('#position_my_vert').val() + ' ' + $('#position_my_hor').val(),
				at: $('#position_at_vert').val() + ' ' + $('#position_at_hor').val()
			}
		}
		$('#jsMeer').Popupmenu(opts);
	}
}