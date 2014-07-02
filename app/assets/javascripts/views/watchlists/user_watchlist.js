CONZQ.Views.UserWatchlist = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	template: JST["watchlists/watchlist"],
	
	events: {
		"click li#watch-link": "watchlistNav"
	},
	
	watchlistNav: function () {
		var $link = $(event.target);
		
		if (!$link.hasClass("selected")) {
			var navTo = $link.attr("data-id");
		
			var view;
			switch (navTo) {
				case "Currently Watching":
					view = new CONZQ.Views.ListSubView({
						list: this.user.currentShows()
					});
				
					break;
				case "Plan to Watch":
					debugger
					view = new CONZQ.Views.ListSubView({
						list: this.user.planToShows()
					});
				
					break;
				case "Completed":
					view = new CONZQ.Views.ListSubView({
						list: this.user.completedShows()
					});
				
					break;
				case "Dropped":
					view = new CONZQ.Views.ListSubView({
						list: this.user.droppedShows()
					});
				
					break;
			}
		
			$link.parent().find(".selected").removeClass("selected");
			$link.addClass("selected");
		
			this._swapViews(view);
		}
	},
	
	render: function () {
		this.$el.html(this.template());
		
		var mainView = new CONZQ.Views.ListSubView({
			list: this.user.currentShows()
		});
		
		this._swapViews(mainView);
		return this;
	},
	
	_swapViews: function (view) {
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.$el.find("section#list-container").html(view.render().$el);
	},
	
	remove: function () {
		this.currentView.remove();
		return Backbone.View.prototype.remove.apply(this);
	}
});