CONZQ.Views.SearchShow = Backbone.View.extend({
	initialize: function (options) {
		this.results = options.results;
		this.resultViews = [];
	},
	
	tagName: "ul",
	
	className: "results",
	
	render: function () {
		var view = this;
		
		_(view.results).each(function (show) {
			var resultView = new CONZQ.Views.SearchResult({ tv: show });
			
			view.$el.append(resultView.render().$el);
			view.resultViews.push(resultView);
		});
		
		return view;
	},
	
	remove: function () {
		_(this.resultViews).each(function (view) { view.remove(); });
		
		return Backbone.View.prototype.remove.apply(this);
	}
});