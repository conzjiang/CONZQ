CONZQ.Views.UserWatchlist = Backbone.View.extend({
	initialize: function (options) {
		this.watchlist = options.watchlist;
		this.statusViews = [];
	},
	
	template: JST["users/watchlist"],
	
	render: function () {
		var content = this.template({ watchlist: this.watchlist });
		this.$el.html(content);
		
		var shows = this.$el.find("ul").children();
		var statusViews = this.statusViews;
		
		_(shows).each(function (show) {
			var statusView = new CONZQ.Views.StatusesView({
				tv: CONZQ.allShows.getOrFetch($(show).attr("data-id"))
			});

			$(show).find("div#statuses-container").html(statusView.render().$el);
			statusViews.push(statusView);
		});
		
		return this;
	},
	
	remove: function () {
		_(this.statusViews).each(function (view) {
			view.remove();
		});
		
		return Backbone.View.prototype.remove.apply(this);
	}
});