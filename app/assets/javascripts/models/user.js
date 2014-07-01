CONZQ.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	
	watchlists: function () {
		if (!this._watchlists) {
			this._watchlists = new CONZQ.Collections.UserWatchlists({
				user: this
			});
		}
		
		return this._watchlists;
	},
	
	currentShows: function () {
		if (!this._currentShows) {
			this._currentShows = new CONZQ.Subsets.CurrentShows({
				parentCollection: CONZQ.allShows
			});
		}
		
		return this._currentShows;
	},
	
	planToShows: function () {
		if (!this._planToShows) {
			this._planToShows = new CONZQ.Subsets.PlanToShows({
				parentCollection: CONZQ.allShows
			});
		}
		
		return this._planToShows;
	},
	
	completedShows: function () {
		if (!this._completedShows) {
			this._completedShows = new CONZQ.Subsets.CompletedShows({
				parentCollection: CONZQ.allShows
			});
		}
		
		return this._completedShows;
	},
	
	droppedShows: function () {
		if (!this._droppedShows) {
			this._droppedShows = new CONZQ.Subsets.DroppedShows({
				parentCollection: CONZQ.allShows
			});
		}
		
		return this._droppedShows;
	},
	
	favorites: function () {
		if (!this._favorites) {
			this._favorites = new CONZQ.Subsets.Favorites({
				parentCollection: CONZQ.allShows
			});
		}
		
		return this._favorites;
	},
	
	followers: function () {
		if (!this._followers) {
			this._followers = new CONZQ.Subsets.Followers({
				parentCollection: CONZQ.users
			});
		}
		
		return this._followers;
	},
	
	idols: function () {
		if (!this._idols) {
			this._idols = new CONZQ.Subsets.Idols({
				parentCollection: CONZQ.users
			});
		}
		
		return this._idols;
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
		
		if (response.currentShows) {
			this.currentShows().set(response.currentShows);
			delete response.currentShows;
		}
		
		if (response.planToShows) {
			this.planToShows().set(response.planToShows);
			delete response.planToShows;
		}
		
		if (response.completedShows) {
			this.completedShows().set(response.completedShows);
			delete response.completedShows;
		}
		
		if (response.droppedShows) {
			this.droppedShows().set(response.droppedShows);
			delete response.droppedShows;
		}
		
		if (response.favorites) {
			this.favorites().set(response.favorites);
			delete response.favorites;
		}
		
		if (response.followers) {
			this.followers().set(response.followers);
			
			delete response.followers;
		}
		
		if (response.idols) {
			this.idols().set(response.idols);
			delete response.idols;
		}
		
		if (response.posts) {
			this.posts().set(response.posts);
			delete response.posts;
		}
		
		return response;
	}
	
});