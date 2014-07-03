CONZQ.Collections.PostComments = Backbone.Collection.extend({
	initialize: function (options) {
		this.post = options.post;
	},
	
	model: CONZQ.Models.PostComment,
	
	url: function () {
		return "/api/posts/" + this.post.id + "/comments";
	}
});