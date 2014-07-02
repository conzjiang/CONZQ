CONZQ.Views.UserShow = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	template: JST["users/show"],
	
	events: {
		"click a#nav": "profileNav",
	},
	
	profileNav: function () {
		event.preventDefault();
		var nav = $(event.target).attr("data-id");
		var view;
		
		switch(nav) {
			case "Watchlist":
				view = new CONZQ.Views.UserWatchlist({ user: this.user });
				break;
			case "Favorites":
				view = new CONZQ.Views.UserFavorites({ 
					favorites: this.user.favorites() 
				});
				
				break;
			case "Follows":
				view = new CONZQ.Views.UserFollows({ 
					user: this.user,
					followers: this.user.followers(),
					idols: this.user.idols() 
				});
				
				break;
			default:
				view = new CONZQ.Views.UserWall({ user: this.user });
				break;
		}
		
		this._swapViews(view);
	},
	
	render: function () {
		var content = this.template({ user: this.user });
		this.$el.html(content);
		
		var userWallView = new CONZQ.Views.UserWall({ user: this.user });
		this._swapViews(userWallView);
		
		return this;
	},
	
	_swapViews: function (view) {
		if (this._currentView) this._currentView.remove();
		this._currentView = view;
		this.$el.find("section.user-container").html(view.render().$el);
	}
});