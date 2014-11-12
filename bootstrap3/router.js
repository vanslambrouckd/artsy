var AppRouter = Backbone.Router.extend({
	routes: {
		':template': 'showTemplate'
	},
	showTemplate: function(template) {
		console.log(template);
		$('#contentWrapper').html($('#bootstrap-'+template).html());
	}
});