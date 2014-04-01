define([
	'backbone'
], function(
	Backbone
  
){
	
	var views = {};
	var ViewManager = _.clone(Backbone.Events);
	ViewManager.on("showView", function(viewData) { // listen for event...
		views[viewData.name] = viewData.view;
		_.each(views, function(view, viewName) { // iterate over saved views
			if(viewName != viewData.name && views[viewName] != null) { // close all views except current
				view.hide();
				views[viewName] = null;
			}
		})
		//console.log(views)
	});
	return ViewManager;
});

