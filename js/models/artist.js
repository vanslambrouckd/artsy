App.Artist = Backbone.Model.extend({
	url: 'https://api.artsy.net/api/artists/'
});

App.Artists = Backbone.Collection.extend({
	model: App.Artist,
	url: 'https://api.artsy.net/api/artists',
	parse: function(data) {
		self = this;
		$.each(data._embedded.artists, function(i, art) {
			self.add(new App.Artist(art));
		});

		return this.models;
	}
});