CONZQ.Views.SearchShow = Backbone.View.extend({
	// collection = search results
	
	tagName: "ul",
	
	className: "results",
	
	render: function () {		
		this.collection.each(function (show) {
			var resultView = new CONZQ.Views.SearchResult({ model: show });
			
			this.$el.append(resultView);
		});
		
		return this;
	}
});