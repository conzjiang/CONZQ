CONZQ.Collections.UserWatchlists = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.UserWatchlist,
	
	url: function () {
		return this.user.url() + "/watchlists"
	},
	
  getOrFetch: function (id) {
    var watchlists = this;
		var show;
		
		var watchlist = this.find(function (watch) {
			return watch.get("tv_show_id") === id;
		});
		
		if (watchlist && !(show = CONZQ.allShows.get(id))) {
      show = new CONZQ.Models.TvShow({ id: id });

      show.fetch({
        success: function() {
					CONZQ.allShows.add(show);
					watchlists.add(show); 
				}
      });
		}
		
    return show;
  }
});