$('#hideClick').qtip({
    content: {
        text: 'I get hidden on click'
    },
    show: 'click',
    hide: {
        event: 'click'
    },
    position: {
        target: 'mouse',
        adjust: {
            mouse: false
        }
    }
});

$('a[data-tooltip!=""]').qtip({ // Grab some elements to apply the tooltip to
    content: {
        attr: 'data-tooltip'
    },
    style: {
    	classes: 'qtip-light qtip-shadow'
    },
    /*
    events: {
    	render: function(event, api) {
    		var elem = api.elements.overlay
    	}
    },
    */
    show:{
		event: 'click'
	},
	hide: {
        event: 'click'
    },
    position: {
        
        my: 'left top',
        at: 'right top',
        //target:'mouse',
        //viewport: $(window),
        
    	adjust: {
    		method: 'flip'
    	}
        
    }
});

$('#login').qtip({
	content: {
		text: _.template($('#tplLogin').html())
	},
	show:  {
        event: 'click',
    	modal: {
    		on: true,
    		blur: false,
    		escape: false
    	}
    } ,
    hide: 'click',
    position: {
        my: 'top center',
        at: 'top center',
        target: $(window)
    }
});

$('#modal').qtip({
    content: {
        text: 'Modal plugin element'
    },
    events: {
        render: function(event, api) {
            // Grab the overlay element
            var elem = api.elements.overlay;
        }
    },
    show: {
        modal: {
            on: true
        },
        event: 'click'
    },
    position: {
        my: 'left top',
        at: 'top center',
        target: $(window)
    }
})
