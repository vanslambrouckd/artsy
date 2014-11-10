var AppRouter = Backbone.Router.extend({
	routes: {
		':template': 'showTemplate'
	},
	showTemplate: function(template) {
		console.log(template);
sidebar = new SidebarView($('#sidebar'));
		
		$('#sidebar').html(sidebar.render().el);

		$('#contentWrapper').html($('#bootstrap-'+template).html());
	}
});