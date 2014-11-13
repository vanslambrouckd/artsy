var app = {
    init: function() {
        $('#draggable').draggable( {
            //containment: '.col',
            cursor: 'move',
            revert: true,
            helper: app.myHelper,
            snap: '#droppable'
          });

        $('#droppable').droppable({
            drop: app.handleDrop,
            hoverClass: 'hovered'
        });
    },
    handleDrop: function(event, ui) {

        var draggable = ui.draggable;
        console.log('the square with id ' + draggable.attr('id') + ' was dropped onto me!');
        ui.draggable.draggable('disable');
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
    },
    myHelper: function() {
        return '<div id="draggableHelper">I am a helper</div>';
    },
    dragEnterLeaveEvent: function (event){
        object = $(event.target);
        object.addClass('hidden');
        $('#'+object.attr('data-toggle')).removeClass('hidden');
    },

    dragStartEvent: function (event) {
            object = $(event.target);
            object.addClass('objet-drag').removeClass('objet-hover');
        },

        dragStopEvent: function (event) {
            object = $(event.target);
            object.addClass('objet-hover').removeClass('objet-drag');
        },

    objectHover: function(event){
        object = $(event.target);
            object.addClass('hidden');
        $('#'+object.attr('data-toggle')).removeClass('hidden');
    },

    dragDropEvent: function(event){
        alert('banana');
    }    
}