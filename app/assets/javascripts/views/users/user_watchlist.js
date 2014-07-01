CONZQ.Views.UserWatchlist = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	template: JST["users/watchlist"],
	
	render: function () {
		var content = this.template({ 
			user: this.user,
			watchlist: this.user.watchlistShows()
		});
		
		this.$el.html(content);
		
		return this;
	}
});