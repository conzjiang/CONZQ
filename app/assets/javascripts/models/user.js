CONZQ.Models.User = Backbone.Model.extend({
	initialize: function () {
		
	},
	
	urlRoot: "/api/users",
	
	watchlists: function () {
		if (!this._watchlists) {
			this._watchlists = new CONZQ.Collections.UserWatchlists({
				user: this
			});
		}
		
		return this._watchlists;
	},
	
	watchlistShows: function () {
		var shows = [];
		
		this.watchlists().each(function (watchlist) {
			var tv = CONZQ.all_shows.getOrFetch(watchlist.get("tv_show_id"));
			shows.push(tv);
		});
		
		return _.sortBy(shows, function (show) {
			return show.get("title");
		});
	},
	
	favorites: function () {
		if (!this._favorites) {
			this._favorites = new CONZQ.Collections.UserFavorites({
				user: this
			});
		}
		
		return this._favorites;
	},
	
	posts: function () {
		if (!this._posts) {
			this._posts = new CONZQ.Collections.UserPosts({
				user: this
			});
		}
		
		return this._posts;
	},
	
	showlist: function () {
		var uniqIds = [];
		var uniqShows = [];
		var allShows = this.watchlistShows().concat(this.favorites().models);
		
		_(allShows).each(function (show) {
			if (uniqIds.indexOf(show.id) === -1) {
				uniqIds.push(show.id);
				uniqShows.push(show);
			}
		});
		
		return _.sortBy(uniqShows, function (show) {
			return show.get("title");
		});
	},
	
	parse: function (response) {
		if (response.watchlists) {
			this.watchlists().set(response.watchlists);
			delete response.watchlists;
		}
		
		if (response.favorites) {
			this.favorites().set(response.favorites);
			delete response.favorites;
		}
		
		if (response.posts) {
			this.posts().set(response.posts);
			delete response.posts;
		}
		
		return response;
	}
	
	
});