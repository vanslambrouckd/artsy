var api = {
  authOpts: {},
  authData: {},
  init: function() {
    api.authOpts.client_id = '239e0993efd9b7643025';
    api.authOpts.client_secret = 'bc0dc779f00f6e5f3338dc763ebd1324';
    
    var self = this;
    
    var backboneSync = Backbone.sync;
    Backbone.sync = function (method, model, options) {
        /*
         * The jQuery `ajax` method includes a 'headers' option
         * which lets you set any headers you like
         */

         self.authenticate().success(function(data) {
            self.authData = data;

            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('X-XAPP-TOKEN', self.authData.token);
                if (beforeSend) return beforeSend.apply(this, arguments);
            }
            /*
            $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
                jqXHR.setRequestHeader("X-XAPP-TOKEN", self.authData.token);
            });
            */

            /*
           * Call the stored original Backbone.sync method with
           * extra headers argument added
           */
          backboneSync(method, model, options);
        });        
    };
  },
  authenticate: function() {
    var self = this;
    //console.log(self.authOpts);

    var req = $.ajax({
        type: 'POST',
        url: 'https://api.artsy.net/api/tokens/xapp_token',
        dataType: 'json',
        data: self.authOpts
    });

    return req;
    /*
    req.done(function(data) {
      PubSub.publish('auth.loggedIn', data);
    });
*/
  }    
 }