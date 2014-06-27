CONZQ.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "tv/:id": "tvShow"
  },

  tvShow: function (id) {
    show = new CONZQ.Models.TvShow({ id: id });

    var tvShowView = new CONZQ.Views.TvShowView({
      model: show.fetch()
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