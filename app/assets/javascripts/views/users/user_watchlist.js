CONZQ.Views.UserWatchlist = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.statusViews = [];
	},
	
	template: JST["users/watchlist"],
	
	render: function () {
		var content = this.template({ 
			user: this.user,
			watchlist: this.user.watchlistShows()
		});
		
		this.$el.html(content);
		
		var shows = this.$el.find("ul").children();
		var statusViews = this.statusViews;
		
		_(shows).each(function (show) {
			var statusView = new CONZQ.Views.StatusesView({
				tv: CONZQ.all_shows.getOrFetch($(show).attr("data-id"))
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