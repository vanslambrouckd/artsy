/* http://www.w3schools.com/bootstrap */
var appRouter = new AppRouter();

$('#contentWrapper').html($('#bootstrap-form-inline').html());

sidebar = new SidebarView($('#sidebar'));
		
		$('#sidebar').html(sidebar.render().el);
		console.log(sidebar.render().el);
		
Backbone.history.start({

});
