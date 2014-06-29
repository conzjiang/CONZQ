CONZQ.Collections.UserWatchlists = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.TvShow,
	
	url: function () {
		return this.user.url() + "/watchlists"
	},
	
  getOrFetch: function (id) {
    var all_shows = this;

    var show;
    if (!(show = this.get(id))) {
      show = new CONZQ.Models.TvShow({ id: id });

      show.fetch({
        success: function() { all_shows.add(show); }
      });
    }

    return show;
  }
});