/**
jquery plugin template via
https://github.com/vanslambrouckd/artsy/blob/master/popupmenu/popupmenu.js
gebaseerd op QTip2
**/
;(function($) {
  // Change this to your plugin name.
  var pluginName = 'popup';
 
  /**
   * Plugin object constructor.
   * Implements the Revealing Module Pattern.
   */
  function Plugin(element, options) {
    // References to DOM and jQuery versions of element.
    var el = element;
    var $el = $(element);

    // Extend default options with those supplied by user.
    options = $.extend({}, $.fn[pluginName].defaults, options);

    options.position.my = _getPosition(options.position.my);
    options.position.at = _getPosition(options.position.at);

    var $popup = options.el;
    var $target = options.target;

    /**
     * Initialize plugin.
     */
    function init() {
      // Add any initialization logic here...
 
      hook('onInit');
      setPosition();
      rebindEvents();
    }
 
    /**
     * Example Public Method
     */
    function fooPublic() {
      // Code goes here...
      //console.log(options);
      alert('foo');
    }

    function _getPosition(val) {
      var arr = val.split(' ');
      return {
        'pos1': arr[0],
        'pos2': arr[1]
      }
    }

    function setPosition() {    
      calcPosHor();
      calcPosVert();    
    }

    function calcPosHor() {
      /*
      volledig OK
      */     
      var coords = getCoords();

      if (options.position.my.pos2 == 'left') {
        if (options.position.at.pos2 == 'right') {
          $popup.css({
            'left': coords.target.left+coords.target.width,
            'right': 'auto'
          });
        } else if (options.position.at.pos2 == 'left') {
          $popup.css({ 
            'left': coords.target.left,
            'right': 'auto' 
          }); 
        } else if (options.position.at.pos2 == 'center') {
          // top left @ top center
          $popup.css({ 
            'left': coords.target.left+(coords.target.width/2),
            'right': 'auto' 
          }); 
        }
      } else if (options.position.my.pos2 == 'right') {
        if (options.position.at.pos2 == 'left') {
          $popup.css({ 
            'left': coords.el.left-coords.popup.width,
            'right': 'auto' 
          }); 
        } else if (options.position.at.pos2 == 'right') {
          var offsetLeft = (coords.target.left+coords.target.width)-coords.popup.width;
          $popup.css({ 
            'left': offsetLeft,
            'right': 'auto' 
          }); 
        } else if (options.position.at.pos2 == 'center') {
          // top right @ top center
          var offsetLeft = coords.target.left+coords.target.width/2 - (coords.popup.width);
          $popup.css({ 
            'left': offsetLeft,
            'right': 'auto' 
          }); 
        }
      }  else if (options.position.my.pos2 == 'center') {
        if (options.position.at.pos2 == 'left') {
          //center @ left
          var offsetLeft = coords.target.left - (coords.popup.width/2);
          $popup.css({ 
            'left': offsetLeft,
            'right': 'auto' 
          }); 
        } else if (options.position.at.pos2 == 'right') {
          //center @ right
          var offsetLeft = coords.target.right - coords.popup.width/2
          $popup.css({ 
            'left': offsetLeft,
            'right': 'auto' 
          }); 
        } else if (options.position.at.pos2 == 'center') {
          //center @ right
          var offsetLeft = (coords.target.left + coords.target.width/2) - coords.popup.width/2;
          $popup.css({ 
            'left': offsetLeft,
            'right': 'auto' 
          }); 
        } 
      }
    }

    function getCoords() {
      var obj = this;

      var coords = {};
      coords.el = {};

      coords.el.top = $el.offset().top;
      coords.el.bottom = $el.offset().top+$el.outerHeight();
      coords.el.vCenter = coords.el.top + ($el.outerHeight()/2);
      coords.el.left = $el.offset().left;
      coords.el.width = $el.outerWidth();
      coords.el.right = coords.el.left + coords.el.width;
      coords.el.height = $el.outerHeight();
      
      coords.popup = {};
      coords.popup.top = $popup.offset().top; 
      coords.popup.bottom = $popup.offset().top+$popup.outerHeight();   
      coords.popup.vCenter = coords.popup.top + ($popup.outerHeight()/2);
      coords.popup.left = $popup.offset().left;
      coords.popup.width = $popup.outerWidth();
      coords.popup.height = $popup.outerHeight();

      coords.target = {};
      coords.target.top = $target.offset().top;
      coords.target.bottom = $target.offset().top+$target.outerHeight();    
      coords.target.vCenter = coords.target.top + ($target.outerHeight()/2);
      coords.target.left = $target.offset().left;
      coords.target.width = $target.outerWidth();
      coords.target.right = coords.target.left + coords.target.width;
      coords.target.height = $target.outerHeight();
      return coords;
    }
    
    function calcPosVert() {
      /*
      werkt volledig
      */
      var coords = getCoords();
      if (options.position.my.pos1 == 'top') {
        if (options.position.at.pos1 == 'top') {
          //top @ top
          var offsetTop = coords.target.top;
          $popup.css({
            top: offsetTop
          });
        } else if (options.position.at.pos1 == 'bottom') {
          //top @ bottom        
          
          var offsetTop = coords.target.top + coords.target.height;
          $popup.css({
            top: offsetTop
          });
        } else if (options.position.at.pos1 == 'center') {
          //top @ center
          var offsetTop = coords.target.top + coords.target.height/2;
          $popup.css({
            top: offsetTop
          });
        }
      } else if(options.position.my.pos1 == 'bottom') {
        if (options.position.at.pos1 == 'top') {
          //bottom @ top
          var offsetTop = coords.target.top - coords.popup.height;
          $popup.css({
            //top: coords.el.top-$popup.outerHeight()
            top: offsetTop
          });
        } else if (options.position.at.pos1 == 'bottom') {
          //bottom @ bottom
          var offsetTop = coords.target.bottom-coords.popup.height;   
          $popup.css({
            top: offsetTop
          });
        } else if (options.position.at.pos1 == 'center') {
          //bottom @ center
          $popup.css({
            top: coords.target.bottom - (coords.target.height/2) - coords.popup.height
          });
        }
      } else if(options.position.my.pos1 == 'center') {
        if (options.position.at.pos1 == 'top') {
          //center @ top
          $popup.css({
            top: coords.el.top - (coords.popup.height) + coords.popup.height/2
          });
        } else if (options.position.at.pos1 == 'bottom') {
          //center @ bottom       
          $popup.css({
            top: coords.el.bottom - coords.popup.height/2
          });
        } else if (options.position.at.pos1 == 'center') {
          //center @ center
          $popup.css({
            top: (coords.el.top - coords.popup.height/2) + coords.el.height/2
          });
        }
      }
    }

    function rebindEvents() {
    //if (obj.settings.el.is(':visible')) {

    if ($popup.css('visibility') != 'hidden') {
    
      $el.off(options.show.event);
      $el.on(options.hide.event, function(event) {
        //alert('hide');
        /*
        stopPropagation: zodat bvb de a click event niet uitgevoerd wordt wanneer je de menu toont via a > i        
        <a><i class="fa fa-chevron-circle-down"></i>My tasks</a>
        */
        event.stopPropagation();
        hide(event);
      });
    } else {
      $el.off(options.show.event);
      $el.on(options.show.event, function(event) {
        event.stopPropagation();        
        show(event);
      });
    }
  }

  function hide(event) {
    var obj = this;
    $popup.delay(options.hide.delay);
    //obj.settings.el.hide();
    $popup.css({
      'zIndex': 0,
      visibility: 'hidden'
    });

    if (typeof options.events.hide !== 'undefined') {
      options.events.hide(event);
    }

    rebindEvents();
  }

  function show(event) {
    /*
    var obj = this;
    var indexes = obj.getInstances();
    indexes = _.without(indexes, obj.index);
    indexes.unshift(obj.index);
    obj.setInstances(indexes);

    $.each(indexes, function(i, index) {
      var $el = $('data-popupmenu-id['+index+']');
      obj.settings.el.css('zIndex', index+9000);
    });
    */
    setPosition();
    //obj.settings.el.css('zIndex', 9999);
    //obj.settings.el.show();
    $popup.css({
      visibility: 'visible'
    });
    
    if (typeof options.events.show !== 'undefined') {
      options.events.show(event);  
    }
    rebindEvents();
  }
 
    /**
     * Get/set a plugin option.
     * Get usage: $('#el').demoplugin('option', 'key');
     * Set usage: $('#el').demoplugin('option', 'key', value);
     */
    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }
 
    /**
     * Destroy plugin.
     * Usage: $('#el').demoplugin('destroy');
     */
    function destroy() {
      // Iterate over each matching element.
      $el.each(function() {
        var el = this;
        var $el = $(this);

        hide();
 
        // Add code to restore the element to its original state...
        console.log($el);
        hook('onDestroy');
        // Remove Plugin instance from the element.
        $el.removeData('plugin_' + pluginName);
      });
    }
 
    /**
     * Callback hooks.
     * Usage: In the defaults object specify a callback function:
     * hookName: function() {}
     * Then somewhere in the plugin trigger the callback:
     * hook('hookName');
     */
    function hook(hookName) {
      if (options[hookName] !== undefined) {
        // Call the user defined function.
        // Scope is set to the jQuery element we are operating on.
        options[hookName].call(el);
      }
    }
 
    // Initialize the plugin instance.
    init();
 
    // Expose methods of Plugin we wish to be public.
    return {
      option: option,
      destroy: destroy,
      fooPublic: fooPublic,
      hide: hide,
      show: show
    };
  }
 
  /**
   * Plugin definition.
   */
  $.fn[pluginName] = function(options) {
    // If the first parameter is a string, treat this as a call to
    // a public method.
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        // Check that the element has a plugin instance, and that
        // the requested public method exists.
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          // Call the method of the Plugin instance, and Pass it
          // the supplied arguments.
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });

      if (returnVal !== undefined){
        // If the method returned a value, return the value.
        return returnVal;
      } else {
        // Otherwise, returning 'this' preserves chainability.
        return this;
      }
    // If the first parameter is an object (options), or was omitted,
    // instantiate a new instance of the plugin.
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        // Only allow the plugin to be instantiated once.
        if (!$.data(this, 'plugin_' + pluginName)) {
          // Pass options to Plugin constructor, and store Plugin
          // instance in the elements jQuery data object.
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };
 
  // Default plugin options.
  // Options can be overwritten when initializing plugin, by
  // passing an object literal, or after initialization:
  // $('#el').demoplugin('option', 'key', value);
  $.fn[pluginName].defaults = {
    onInit: function() {},
    onDestroy: function() {},
    position: {
      my: 'top left',
      at: 'bottom right'
    },
    show: {
      delay: 0,
      event: 'click'
    },
    events: {
      hide: function(event) {

      },
      show: function(event) {

      }
    },
    hide: {
      delay: 3000,
      event: 'click'
      //event: 'mouseleave'
    }
  };
 
})(jQuery);