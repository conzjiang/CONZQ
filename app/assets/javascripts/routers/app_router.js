CONZQ.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.$sidebar = options.$sidebar;
		this.$mainEl = options.$mainEl;
		
		this.tvShowStatus();
		this.genreForm();
		
		this.frontPageShows = new CONZQ.Collections.IndexShows();
		
		var searchbarView = new CONZQ.Views.Searchbar({
			$sidebar: options.$sidebar
		});
		this.$rootEl.prepend(searchbarView.render().$el);
  },

  routes: {
		"": "index",
		"index": "frontPageShow",
		"users/:id": "userShow",
		"tv/:id": "tvShow"
  },
	
	index: function () {
		var $indexContainer = $("section#index");
		
		if ($indexContainer.length > 0) {
			var that = this;
			this.frontPageShows.fetch({
				success: function () {
					var indexView = new CONZQ.Views.IndexView({
						currentlyShows: that.frontPageShows
					});
				
					$indexContainer.html(indexView.render().$el);
					that._currentView = indexView;
				}
			});
		}
	},
	
	frontPageShow: function () {
		var that = this;
		this.frontPageShows.fetch({
			success: function () {
				var indexView = new CONZQ.Views.IndexView({
					currentlyShows: that.frontPageShows
				});
			
				that._swapViews(indexView);
			}
		});
	},
	
	userShow: function (id) {
		var userShowView = new CONZQ.Views.UserShow({
			user: CONZQ.users.getOrFetch(id)
		});
	
		this._swapViews(userShowView);
	},
	
	tvShow: function (id) {
		var tv = CONZQ.allShows.getOrFetch(id);
		
		var tvShowView = new CONZQ.Views.TvShow({ tv: tv });
		this._swapViews(tvShowView);
	},
	
	tvShowStatus: function () {
		var $statusContainer = $("div#tv-show-page-statuses");
		
		if ($statusContainer.length > 0) {
			var tvId = $statusContainer.attr("data-id");
		
			this.showStatusView = new CONZQ.Views.StatusesView({
				tv: CONZQ.allShows.getOrFetch(tvId)
			});
		
			$statusContainer.html(this.showStatusView.render().$el);
		}
	},
	
	genreForm: function () {
		var $genreForm = $("div.genre-form");
		
		if ($genreForm.length > 0) {
			var tvId = $genreForm.attr("data-id");
			var restGenres = new CONZQ.Collections.Genres();
			var that = this;
			
			restGenres.fetch({
				success: function () {
					that.genreFormView = new CONZQ.Views.GenreForm({
						genres: CONZQ.allShows.getOrFetch(tvId).get("genre_names"),
						restGenres: restGenres
					});
			
					$genreForm.html(that.genreFormView.render().$el);
				}
			});
		}
	},

  _swapViews: function (view) {
    if (this.showStatusView) this.showStatusView.remove();
		if (this.genreFormView) this.genreFormView.remove();
		if (this._currentView) this._currentView.remove();
		
    this._currentView = view;
    this.$mainEl.html(view.render().$el);
  }
});