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
			'region': 'right',
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
		werkt volledig
		*/
		var obj = this;
		
		var coords = obj.getCoords();

		if (obj.settings.position.my.pos2 == 'left') {
			if (obj.settings.position.at.pos2 == 'right') {
				//OK
				obj.$popup.css({
					'left': coords.el.left+coords.el.width,
					'right': 'auto'
				});
			} else if (obj.settings.position.at.pos2 == 'left') {
				//OK
				obj.$popup.css({ 
					'left': coords.el.left,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				//OK
				// top left @ top center
				obj.$popup.css({ 
					'left': coords.el.left+(obj.$el.outerWidth()/2),
					'right': 'auto' 
				});	
			}
		} else if (obj.settings.position.my.pos2 == 'right') {
			if (obj.settings.position.at.pos2 == 'left') {
				//OK
				obj.$popup.css({ 
					'left': coords.el.left-obj.$popup.outerWidth(),
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'right') {
				//OK
				var offsetLeft = (coords.el.left+coords.el.width)-coords.popup.width;
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				//OK
				// top right @ top center
				var offsetLeft = coords.el.left-coords.popup.width + (obj.$el.outerWidth()/2);
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			}
		}  else if (obj.settings.position.my.pos2 == 'center') {
			if (obj.settings.position.at.pos2 == 'left') {
				//center @ left
				var offsetLeft = coords.el.left - (coords.popup.width/2);
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'right') {
				//OK
				//center @ right
				var offsetLeft = coords.el.right - coords.popup.width/2;
				obj.$popup.css({ 
					'left': offsetLeft,
					'right': 'auto' 
				});	
			} else if (obj.settings.position.at.pos2 == 'center') {
				//OK
				//center @ right
				var offsetLeft = (coords.el.left + coords.el.width/2) - coords.popup.width/2;
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

		coords.el.top = obj.$el.offset().top,
		coords.el.bottom = obj.$el.offset().top+obj.$el.outerHeight();
		coords.el.vCenter = coords.el.top + (obj.$el.outerHeight()/2);
		coords.el.left = obj.$el.offset().left;
		coords.el.width = obj.$el.outerWidth();
		coords.el.right = coords.el.left + coords.el.width;
		
		coords.popup = {};
		coords.popup.top = obj.$popup.offset().top,		
		coords.popup.bottom = obj.$popup.offset().top+obj.$popup.outerHeight();		
		coords.popup.vCenter = coords.popup.top + (obj.$popup.outerHeight()/2);
		coords.popup.left = obj.$popup.offset().left;
		coords.popup.width = obj.$popup.outerWidth();
		return coords;
	}

	Plugin.prototype.calcPosVert = function() {
		/*
		werkt volledig
		*/
		var obj = this;		
		var coords = obj.getCoords();
				
		if (obj.settings.position.my.pos1 == 'top') {
			if (obj.settings.position.at.pos1 == 'top') {
				//OK
				//top @ top
				obj.$popup.css({
					top: coords.el.top
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//OK
				//top @ bottom				
				obj.$popup.css({
					top: coords.el.bottom
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//OK
				//top @ center
				obj.$popup.css({
					top: coords.el.vCenter
				});
			}
		} else if(obj.settings.position.my.pos1 == 'bottom') {
			if (obj.settings.position.at.pos1 == 'top') {
				//OK
				//bottom @ top
				obj.$popup.css({
					top: coords.el.top-obj.$popup.outerHeight()
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//OK
				//bottom @ bottom				
				obj.$popup.css({
					top: coords.el.bottom-obj.$popup.outerHeight()
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//OK
				//bottom @ center
				obj.$popup.css({
					top: coords.el.bottom-obj.$popup.outerHeight()-(obj.$el.outerHeight()/2)
				});
			}
		} else if(obj.settings.position.my.pos1 == 'center') {
			if (obj.settings.position.at.pos1 == 'top') {
				//OK
				//center @ top
				obj.$popup.css({
					top: coords.el.top-obj.$popup.outerHeight()/2
				});
			} else if (obj.settings.position.at.pos1 == 'bottom') {
				//OK
				//center @ bottom				
				obj.$popup.css({
					top: coords.el.bottom-obj.$popup.outerHeight()/2
				});
			} else if (obj.settings.position.at.pos1 == 'center') {
				//OK
				//center @ center
				obj.$popup.css({
					top: coords.el.top + (obj.$el.outerHeight()/2) - (obj.$popup.outerHeight()/2)
				});
			}
		}
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
		if (obj.settings.el.is(':visible')) {
			obj.$el.off(obj.settings.show.event);
			obj.$el.on(obj.settings.hide.event, function(event) {
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
		obj.settings.el.hide();
		obj.settings.el.css('zIndex', 0);
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

		//obj.settings.el.css('zIndex', 9999);
		obj.settings.el.show();
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