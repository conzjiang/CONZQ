CONZQ.Views.SearchShow = Backbone.View.extend({
	// collection = search results
	initialize: function () {
		this.resultViews = [];
	},
	
	tagName: "ul",
	
	className: "results",
	
	render: function () {
		var view = this;
		var resultViews = this.resultViews;
		
		_(view.collection).each(function (show) {
			var tv = CONZQ.all_shows.getOrFetch(show.id);			
			var resultView = new CONZQ.Views.SearchResult({ model: tv });
			
			view.$el.append(resultView.render().$el);
			resultViews.push(resultView);
		});
		
		return view;
	},
	
	remove: function () {
		_(this.resultViews).each(function (view) { view.remove(); });
		
		return Backbone.View.prototype.remove.apply(this);
	}
});