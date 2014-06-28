CONZQ.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
		"search/result/:id": "resultShow",
    "tv/:id": "tvShow"
  },
	
	resultShow: function (id) {
		var searchShowView = new CONZQ.Views.SearchShow({
			model: CONZQ.all_shows.getOrFetch(id)
		});
		
    this._swapViews(searchShowView);
	},

  tvShow: function (id) {
    var tvShowView = new CONZQ.Views.TvShowView({
      model: CONZQ.all_shows.getOrFetch(id)
    });
		
    this._swapViews(tvShowView);
  },	

  _swapViews: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});