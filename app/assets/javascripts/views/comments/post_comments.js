CONZQ.Views.PostComments = Backbone.View.extend({
	initialize: function (options) {
		this.comments = options.comments;
	},
	
	tagName: "ul",
	
	className: "comments",
	
	template: JST["posts/comments"],
	
	render: function () {
		var content = this.template({ comments: this.comments });
		this.$el.html(content);
		return this;
	}
});