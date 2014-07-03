window.CONZQ = {
  Models: {},
  Collections: {},
	Subsets: {},
  Views: {},
  Routers: {},
  initialize: function(rootEl, sidebar, main) {
		var els = {
			rootEl: rootEl,
			sidebar: sidebar,
			main: main
		};
		
    CONZQ.allShows = new CONZQ.Collections.TvShows();
		CONZQ.users = new CONZQ.Collections.Users();
		CONZQ.miniUserViews = new CONZQ.Collections.Users();
		CONZQ.searches = new CONZQ.Collections.SessionSearches();
		
		if (window.currentUser) {
			CONZQ.currentUser = new CONZQ.Models.User({ id: window.currentUser.id });
			
			$.when(CONZQ.allShows.fetch(), CONZQ.currentUser.fetch())
				.done(function () {
					CONZQ.users.add(CONZQ.currentUser);
					CONZQ.startRouter(els);
				});
				
		} else {
			CONZQ.allShows.fetch({
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


