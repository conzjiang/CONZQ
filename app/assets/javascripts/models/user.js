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
		return this.watchlists().models.concat(this.favorites().models);
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