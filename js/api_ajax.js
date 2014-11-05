var api = {
  authOpts: {},
  authData: {},
  request: function(options) {
    api.authOpts.client_id = '239e0993efd9b7643025';
    api.authOpts.client_secret = 'bc0dc779f00f6e5f3338dc763ebd1324';
    var defaults = {
      dataType: 'json'
    };

    var settings = $.extend(defaults, options);
    var self = this;
    
    var ret = $.ajax(settings).fail(function(jqXHR, e) {
        console.log(jqXHR.status);
        if (jqXHR.status == 401) {
          //authentication error

          
          self.authenticate().success(function(data) {
              self.authData = data;
              $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
                jqXHR.setRequestHeader("X-XAPP-TOKEN", self.authData.token);
              });
              //console.log(settings);
              $.ajax(settings);
          });

        }
    });

    return ret;
  },
  authenticate: function() {
    var self = this;
    console.log(self.authOpts);

    var req = api.request({
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