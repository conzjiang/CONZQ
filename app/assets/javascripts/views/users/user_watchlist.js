CONZQ.Views.UserWatchlist = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		
		this.currentShows = this.user.currentShows();
		this.planToShows = this.user.planToShows();
		this.completedShows = this.user.completedShows();
		this.droppedShows = this.user.droppedShows();
		
		this.statusViews = [];
	},
	
	template: JST["users/watchlist"],
	
	render: function () {
		var content = this.template({ 
			currentShows: this.currentShows,
			planToShows: this.planToShows,
			completedShows: this.completedShows,
			droppedShows: this.droppedShows 
		});
		
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
		_(this.statusViews).each(function (view) { view.remove(); });
		
		return Backbone.View.prototype.remove.apply(this);
	}
});