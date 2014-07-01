CONZQ.Collections.Follows = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.Follow,
	
	url: function () {
		return this.user.url() + "/follows";
	}
});