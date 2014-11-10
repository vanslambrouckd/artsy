SidebarView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},	
	render: function() {
		var items = [];
		var template = _.template($('#template-sidebar').html(), items);
		//console.log($('#template-sidebar').html());
		this.$el.html(template);
		return this;
	}
});