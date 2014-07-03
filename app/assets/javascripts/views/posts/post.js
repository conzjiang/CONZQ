CONZQ.Views.Post = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.post = options.post;
		this.postsCollection = options.postsCollection;
				
		this.$el.attr("data-id", this.post.id);
	},
	
	tagName: "li",
	
	className: "group",
	
	template: JST["posts/post"],
	
	events: {
		"submit form#post-form": "createPost",
		"click .x": "deletePost",
		"click #view-comments": "expand",
		"submit form#comment-form": "createComment"
	},
	
	createPost: function () {
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		this.postsCollection.create(params, { wait: true, sort: true });
	},
	
	deletePost: function () {
		var $post = $(event.target).closest("li");
		var postId = $post.attr("data-id");
		var post = this.postsCollection.get(postId);

		post.destroy();
	},
	
	expand: function () {
		var $post = $(event.currentTarget);
		$post.addClass("expand");
		
		this.commentsView = new CONZQ.Views.PostComments({
			comments: this.post.comments()
		});
		
		$post.find("section.comments-right").html(this.commentsView.render().$el);
	},
	
	createComment: function () {
		event.preventDefault();
		
		var $form = $(event.target);
		var commentParams = $form.serializeJSON();
		
		var comments = this.post.comments();
		
		this.post.save(commentParams, {
			success: function (comment) {
				comments.add(comment);
			}
		});
	},
	
	render: function () {
		var content = this.template({
			post: this.post,
			signedIn: !!CONZQ.currentUser,
			isThisUser: CONZQ.currentUser.id === this.user.id
		});
		
		this.$el.html(content);
		return this;
	},
	
	remove: function () {
		if (this.commentsView) this.commentsView.remove();
		return Backbone.View.protoype.remove.apply(this);
	}
});