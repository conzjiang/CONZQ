CONZQ.Collections.PostComments = Backbone.Collection.extend({
	initialize: function (options) {
		this.post = options.post;
	},
	
	model: CONZQ.Models.PostComment,
	
	url: function () {
		return this.post.url() + "/comments";
	}
});