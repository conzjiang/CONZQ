CONZQ.Models.TvShow = Backbone.Model.extend({
  initialize: function () {
  },

  urlRoot: "/api/tv_shows",
	
	rating: function () {
		var rating = this.get("rating").toString();
		if (rating.length === 1) rating += ".0";
		return rating;
	}
});