CONZQ.Models.User = Backbone.Model.extend({
	initialize: function () {
		
	},
	
	urlRoot: "api/users",
	
	watchlists: function () {
		if (!this._watchlists) {
			this._watchlists = new CONZQ.Collections.UserWatchlists({
				user: this
			});
		}
		
		return this._watchlists;
	},
	
	favorites: function () {
		if (!this._favorites) {
			this._favorites = new CONZQ.Collections.UserFavorites({
				user: this
			});
		}
		
		return this._favorites;
	},
	
	parse: function (response) {
		if (response.watchlist_shows) {
			this.watchlists().set(response.watchlist_shows);
			delete response.watchlist_shows;
		}
		
		if (response.favorite_shows) {
			this.favorites().set(response.favorite_shows);
			delete response.favorite_shows;
		}
		
		return response;
	}
	
	
});