CONZQ.Views.PostComments = Backbone.View.extend({
	initialize: function (options) {
		this.post = options.post;
		this.comments = options.comments;
		
		this.listenTo(this.comments, "add remove", this.render);
	},
	
	tagName: "ul",
	
	className: "comments",
	
	template: JST["posts/comments"],
	
	events: {
		"dblclick li#comment": "showDeleteView",
		"click button#cancel": "cancelDelete",
		"click button#delete": "deleteComment"
	},
	
	showDeleteView: function () {
		$(event.target).closest("li#comment").toggleClass("delete");
	},
	
	cancelDelete: function () {
		$(event.target).closest("li#comment").removeClass("delete");
	},
	
	deleteComment: function () {
		var $comment = $(event.target).closest("li#comment");
		var commentId = $comment.attr("data-id");
		var view = this;
		
		this.post.save({ comment: { id: commentId } }, {
			success: function (comment) {
				view.comments.remove(comment);
			}
		});
	},
	
	render: function () {
		var content = this.template({
			comments: this.comments,
			isPostAuthor: CONZQ.currentUser.id == this.post.get("user_id")
		});
		
		this.$el.html(content);
		return this;
	}
});