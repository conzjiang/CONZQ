window.CONZQ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(rootEl) {
    CONZQ.all_shows = new CONZQ.Collections.TvShows();
		
		if (window.currentUser) {
			CONZQ.currentUser = new CONZQ.Models.User({
				id: window.currentUser.id
			});
			
			$.when(CONZQ.all_shows.fetch(), CONZQ.currentUser.fetch())
				.done(function () {
			    new CONZQ.Routers.AppRouter({
			      $rootEl: rootEl
			    });
				
			    Backbone.history.start();
				});
		} else {
			CONZQ.all_shows.fetch({
				success: function () {
			    new CONZQ.Routers.AppRouter({
			      $rootEl: rootEl
			    });
				
			    Backbone.history.start();
				}
			});
		}
		
  }
};


