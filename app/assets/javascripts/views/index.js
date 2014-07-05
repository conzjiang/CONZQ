CONZQ.Views.IndexView = Backbone.View.extend({
	initialize: function (options) {
		this.currentlyShows = options.currentlyShows;
		this.tvViews = [];
	},
	
	template: JST["index"],
	
	render: function () {
		this.$el.html(this.template());
		
		var that = this;
		this.currentlyShows.each(function (show) {
			var tvView = new CONZQ.Views.SearchResult({ tv: show });
			
			that.$el.find("ul.results").append(tvView.render().$el);
			that.tvViews.push(tvView);
		});
		
		return this;
	},
	
	remove: function () {
		_(this.tvViews).each(function (view) { view.remove(); });
		return Backbone.View.prototype.remove.apply(this);
	}
});