;(function($) {
	/*
	gebaseerd op 
	https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
	http://css-tricks.com/snippets/jquery/styled-popup-menu/
	*/
	var pluginName = 'Popupmenu'

	$[pluginName] = {
		lookup:[]
	}

	function Plugin($elem, options) {
		var obj = this;
		//opties afgekeken van qtip2
		var defaults = {
			position: {
				my: 'top left',
				at: 'bottom right'
			},
			show: {
				delay: 0,
				event: 'click'
			},
			hide: {
				delay: 3000,
				event: 'click'
				//event: 'mouseleave'
			}
		}
		
		if (!options.el) {
			options.el = $($elem.attr('data-popupmenu-el'));	
		}
		obj.settings = $.extend({}, defaults, options);
		obj.settings.position.my = getPosition(obj.settings.position.my);
		obj.settings.position.at = getPosition(obj.settings.position.at);
		//console.log($elem);

		obj.$el = $elem; //element die event veroorzaakt
		obj.$el.attr('data-popupmenu-id', obj.index);
		obj.$popup = obj.settings.el;
		obj.$target = obj.settings.target;
		obj.setPosition();

		
		obj.index = $[pluginName].lookup.push(obj)-1;
		obj.rebindEvents();

		var indexes = obj.getInstances();
		
		indexes.push(obj.index);
		$('body').data('popupmenu-indexes', indexes);
		//console.log(indexes);

		function getPosition(val) {
			var arr = val.split(' ');
			return {
				'pos1': arr[0],
				'pos2': arr[1]
			}
		}
	}

	Plugin.prototype.calcPosHor = function() {
		/*
		volledig OK
		*/
		var obj = this;
		
		var coords = obj.getCoords();

		if (obj.settings.position.my.pos2 == 'left') {
			if (obj.settings.position.at.pos2 == 'right') {
				obj.$popup.css({
					'left': coords.target.left+coords.target.width,
					'right': 'auto'
				});
			} else if (obj.settings.position.at.pos2 == 'left') {
				obj.$popup.css({ 
					'left': coords.target.left,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				// top left @ top center
				obj.$popup.css({ 
					'left': coords.target.left+(coords.target.width/2),
					'right': 'auto' 
				});	
			}
		} else if (obj.settings.position.my.pos2 == 'right') {
			if (obj.settings.position.at.pos2 == 'left') {
				obj.$popup.css({ 
					'left': coords.el.left-coords.popup.width,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'right') {
				var offsetLeft = (coords.target.left+coords.target.width)-coords.popup.width;
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				// top right @ top center
				var offsetLeft = coords.target.left+coords.target.width/2 - (coords.popup.width);
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			}
		}  else if (obj.settings.position.my.pos2 == 'center') {
			if (obj.settings.position.at.pos2 == 'left') {
				//center @ left
				var offsetLeft = coords.target.left - (coords.popup.width/2);
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'right') {
				//center @ right
				var offsetLeft = coords.target.right - coords.popup.width/2
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				//center @ right
				var offsetLeft = (coords.target.left + coords.target.width/2) - coords.popup.width/2;
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} 
		}
	}

	Plugin.prototype.getCoords = function() {
		var obj = this;

		var coords = {};
		coords.el = {};

		coords.el.top = obj.$el.offset().top;
		coords.el.bottom = obj.$el.offset().top+obj.$el.outerHeight();
		coords.el.vCenter = coords.el.top + (obj.$el.outerHeight()/2);
		coords.el.left = obj.$el.offset().left;
		coords.el.width = obj.$el.outerWidth();
		coords.el.right = coords.el.left + coords.el.width;
		coords.el.height = obj.$el.outerHeight();
		
		coords.popup = {};
		coords.popup.top = obj.$popup.offset().top;	
		coords.popup.bottom = obj.$popup.offset().top+obj.$popup.outerHeight();		
		coords.popup.vCenter = coords.popup.top + (obj.$popup.outerHeight()/2);
		coords.popup.left = obj.$popup.offset().left;
		coords.popup.width = obj.$popup.outerWidth();
		coords.popup.height = obj.$popup.outerHeight();

		coords.target = {};
		coords.target.top = obj.$target.offset().top;
		coords.target.bottom = obj.$target.offset().top+obj.$target.outerHeight();		
		coords.target.vCenter = coords.target.top + (obj.$target.outerHeight()/2);
		coords.target.left = obj.$target.offset().left;
		coords.target.width = obj.$target.outerWidth();
		coords.target.right = coords.target.left + coords.target.width;
		coords.target.height = obj.$target.outerHeight();
		return coords;
	}

	Plugin.prototype.calcPosVert = function() {
		/*
		werkt volledig
		*/
		console.clear();
		var obj = this;		
		var coords = obj.getCoords();

		console.log(obj.settings.position.my);
				
		if (obj.settings.position.my.pos1 == 'top') {
			if (obj.settings.position.at.pos1 == 'top') {
				//top @ top
				var offsetTop = coords.target.top;
				obj.$popup.css({
					top: offsetTop
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//top @ bottom				
				
				var offsetTop = coords.target.top + coords.target.height;
				obj.$popup.css({
					top: offsetTop
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//top @ center
				var offsetTop = coords.target.top + coords.target.height/2;
				obj.$popup.css({
					top: offsetTop
				});
			}
		} else if(obj.settings.position.my.pos1 == 'bottom') {
			if (obj.settings.position.at.pos1 == 'top') {
				//bottom @ top
				var offsetTop = coords.target.top - coords.popup.height;
				obj.$popup.css({
					//top: coords.el.top-obj.$popup.outerHeight()
					top: offsetTop
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//bottom @ bottom
				var offsetTop = coords.target.bottom-coords.popup.height;		
				obj.$popup.css({
					top: offsetTop
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//bottom @ center
				obj.$popup.css({
					top: coords.target.bottom - (coords.target.height/2) - coords.popup.height
				});
			}
		} else if(obj.settings.position.my.pos1 == 'center') {
			if (obj.settings.position.at.pos1 == 'top') {
				//center @ top
				obj.$popup.css({
					top: coords.el.top - (coords.popup.height) + coords.popup.height/2
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//center @ bottom				
				obj.$popup.css({
					top: coords.el.bottom - coords.popup.height/2
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//center @ center
				obj.$popup.css({
					top: (coords.el.top - coords.popup.height/2) + coords.el.height/2
				});
			}
		}
	}

	Plugin.prototype.reposition = function() {
		var obj = this;
		obj.calcPosHor();
		obj.calcPosVert();
		console.log('reposition');
	}

	Plugin.prototype.setPosition = function() {
		var obj = this;
		
		obj.calcPosHor();
		obj.calcPosVert();		
	}
	
	Plugin.prototype.getInstances = function() {
		var indexes = $('body').data('popupmenu-indexes');
		if (!indexes) {
			indexes = [];
		}
		return indexes;
	}

	Plugin.prototype.setInstances = function(indexes) {
		$('body').data('popupmenu-indexes', indexes);
	}

	Plugin.prototype.rebindEvents = function() {
		var obj = this;
		//if (obj.settings.el.is(':visible')) {

		if (obj.settings.el.css('visibility') != 'hidden') {
		
			obj.$el.off(obj.settings.show.event);
			obj.$el.on(obj.settings.hide.event, function(event) {
				//alert('hide');
				/*
				stopPropagation: zodat bvb de a click event niet uitgevoerd wordt wanneer je de menu toont via a > i 				
				<a><i class="fa fa-chevron-circle-down"></i>My tasks</a>
				*/
				event.stopPropagation();
				obj.hide();
				obj.rebindEvents();
			});
		} else {
			obj.$el.off(obj.settings.show.event);
			obj.$el.on(obj.settings.show.event, function(event) {
				event.stopPropagation();				
				obj.show();
				obj.rebindEvents();
			});
		}
	}

	Plugin.prototype.hide = function() {
		var obj = this;
		obj.settings.el.delay(obj.settings.hide.delay);
		//obj.settings.el.hide();
		obj.settings.el.css('zIndex', 0);
		obj.$popup.css({
			visibility: 'hidden'
		});
	}

	Plugin.prototype.show = function() {
		var obj = this;
		var indexes = obj.getInstances();
		indexes = _.without(indexes, obj.index);
		indexes.unshift(obj.index);
		obj.setInstances(indexes);

		$.each(indexes, function(i, index) {
			var $el = $('data-popupmenu-id['+index+']');
			obj.settings.el.css('zIndex', index+9000);
		});

		obj.setPosition();

		//obj.settings.el.css('zIndex', 9999);
		//obj.settings.el.show();
		obj.$popup.css({
			visibility: 'visible'
		});
	}

	/* plugin constructor */
	$.fn[pluginName] = function(opts) {
		var instance;
		var $elem;

		this.each(function(index, elem) {
			$elem = $(elem);

			if ($elem.data(pluginName) == null) {
				instance = new Plugin($elem, opts);
				$elem.data(pluginName, instance.index);
				//instance.show();
			}
		});
		return instance;
	}
})(window.jQuery);