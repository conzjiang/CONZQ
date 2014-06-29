CONZQ.Collections.UserWatchlists = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.TvShow,
	
	url: function () {
		return this.user.url() + "/watchlists"
	}
});