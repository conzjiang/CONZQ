window.CONZQ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(rootEl) {
    CONZQ.all_shows = new CONZQ.Collections.TvShows();
		
		CONZQ.all_shows.fetch({
			success: function () {
				
		    new CONZQ.Routers.AppRouter({
		      $rootEl: rootEl
		    });
				
		    Backbone.history.start();
				
			}
		});
  }
};


