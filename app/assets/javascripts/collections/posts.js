CONZQ.Collections.Posts = Backbone.Collection.extend({
	model: CONZQ.Models.Post,

	url: "/api/posts",
	
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