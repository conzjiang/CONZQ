CONZQ.Collections.UserWatchlists = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.UserWatchlist,
	
	url: function () {
		return this.user.url() + "/watchlists"
	},
	
	findByTvId: function (tvId) {
		return this.find(function (watch) {
			return watch.get("tv_show_id") == tvId;
		});
	}
});