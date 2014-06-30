CONZQ.Collections.TvShows = Backbone.Collection.extend({
  url: "/api/tv_shows",

  model: CONZQ.Models.TvShow,

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
  },
	
	comparator: function (tv) {
		return tv.get("title");
	}
});