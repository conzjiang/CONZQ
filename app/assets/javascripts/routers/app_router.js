CONZQ.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.$sidebar = options.$sidebar;
		this.$mainEl = options.$mainEl;
		
		
		var searchbarView = new CONZQ.Views.Searchbar({
			$sidebar: options.$sidebar
		});
		
		this.$rootEl.prepend(searchbarView.render().$el);
  },

  routes: {
    "tv/:id": "tvShow",
		"users/:id": "userShow"
  },
	
	displaySearch: function (searchShowView) {
		this._swapViews(searchShowView);
	},

  tvShow: function (id) {
    var tvShowView = new CONZQ.Views.TvShowView({
      model: CONZQ.all_shows.getOrFetch(id)
    });
		
    this._swapViews(tvShowView);
  },	
	
	userShow: function (id) {
		var user = new CONZQ.Models.User({ id: id });
		var that = this;
		
		user.fetch({
			success: function () {
				var userShowView = new CONZQ.Views.UserShow({
					user: user 
				});
			
				that._swapViews(userShowView);
			}
		});
	},

  _swapViews: function (view) {
    if (this.currentView) this.currentView.remove();

    this.currentView = view;
    this.$mainEl.html(view.render().$el);
  }
});