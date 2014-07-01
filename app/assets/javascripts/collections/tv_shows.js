CONZQ.Collections.TvShows = Backbone.Collection.extend({
  url: "/api/tv_shows",

  model: CONZQ.Models.TvShow,

  getOrFetch: function (id) {
    var allShows = this;

    var show;
    if (!(show = this.get(id))) {
      show = new CONZQ.Models.TvShow({ id: id });

      show.fetch({
        success: function() { allShows.add(show); }
      });
    }

    return show;
  },
	
	comparator: function (tv) {
		return tv.get("title");
	}
});