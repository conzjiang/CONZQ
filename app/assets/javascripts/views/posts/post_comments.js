CONZQ.Views.PostComments = Backbone.View.extend({
	initialize: function (options) {
		this.comments = options.comments;
		
		this.listenTo(this.comments, "add remove", this.render);
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