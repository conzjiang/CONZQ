CONZQ.Collections.UserPosts = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	model: CONZQ.Models.UserPost,

	url: function () {
		return this.user.url() + "/posts";
	},
	
	comparator: function (post1, post2) {
		var date1 = Date.parse(post1.get("created_at"));
		var date2 = Date.parse(post2.get("created_at"));
		
		if (date1 > date2) {
			return -1;
		} else if (date2 > date1) {
			return 1;
		} else { return 0; }
	}
});