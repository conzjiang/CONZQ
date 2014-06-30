window.CONZQ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(rootEl, sidebar, main) {
		var els = {
			rootEl: rootEl,
			sidebar: sidebar,
			main: main
		};
		
    CONZQ.all_shows = new CONZQ.Collections.TvShows();
		
		if (window.currentUser) {
			CONZQ.currentUser = new CONZQ.Models.User({ id: window.currentUser.id });
			
			$.when(CONZQ.all_shows.fetch(), CONZQ.currentUser.fetch())
				.done(function () { CONZQ.startRouter(els); });
				
		} else {
			CONZQ.all_shows.fetch({
				success: function () { CONZQ.startRouter(els); }
			});
		}
  },
	
	startRouter: function (options) {
    CONZQ.appRouter = new CONZQ.Routers.AppRouter({
			$rootEl: options.rootEl,
			$sidebar: options.sidebar,
      $mainEl: options.main
    });
	
    Backbone.history.start();
	}
};


