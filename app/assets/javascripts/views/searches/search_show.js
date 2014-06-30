CONZQ.Views.SearchShow = Backbone.View.extend({
	// collection = search results
	
	tagName: "ul",
	
	className: "results",
	
	render: function () {
		var view = this;
		
		_(view.collection).each(function (show) {
			var tv = CONZQ.all_shows.getOrFetch(show.id);
			
			var resultView = new CONZQ.Views.SearchResult({ model: tv });
			
			view.$el.append(resultView.render().$el);
		});
		
		return view;
	}
});