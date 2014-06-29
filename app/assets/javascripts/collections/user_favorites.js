CONZQ.Collections.UserFavorites = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.TvShow,
	
	url: function () {
		return this.user.url() + "/favorites"
	}
});