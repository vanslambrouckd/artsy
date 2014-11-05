App.ArtistView = Backbone.View.extend({
	tagName: 'li',
	className: 'artist',
	model: App.Artist,
	events: {
		'click': 'selectMovie'
	},
	render: function() {
		var template = _.template($('#tplArtist').html());
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
	selectMovie: function(event) {
		event.preventDefault();
		console.log(this.model);

		var artistView = new App.ArtistView({ el: $('#artistDetail'), model: this.model});
        artistView.render();

	}
});

App.ArtistListView = Backbone.View.extend({
	render: function() {
		//console.log(this.collection);
		
		var view = this.collection.map(function(movie) {
			//console.log(movie);
			return new App.ArtistView({model: movie}).render().el;
		});
		//var artistView = new App.ArtistView()
		$(this.el).html(view);
		return this;
	}
});