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
		obj.$elem = $elem;
		obj.$elem.attr('data-popupmenu-id', obj.index);

		obj.index = $[pluginName].lookup.push(obj)-1;
		obj.rebindEvents();

		var indexes = obj.getInstances();
		
		indexes.push(obj.index);
		$('body').data('popupmenu-indexes', indexes);
		console.log(indexes);
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
			obj.$elem.off(obj.settings.show.event);
			obj.$elem.on(obj.settings.hide.event, function(event) {
				/*
				stopPropagation: zodat bvb de a click event niet uitgevoerd wordt wanneer je de menu toont via a > i 				
				<a><i class="fa fa-chevron-circle-down"></i>My tasks</a>
				*/
				event.stopPropagation();
				obj.hide();
				obj.rebindEvents();
			});
		} else {
			obj.$elem.off(obj.settings.show.event);
			obj.$elem.on(obj.settings.show.event, function(event) {
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