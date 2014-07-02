CONZQ.Views.UserPost = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.post = options.post;
		this.postsCollection = options.postsCollection;
				
		this.$el.attr("data-id", this.post.id);
	},
	
	tagName: "li",
	
	className: "group",
	
	template: JST["users/post"],
	
	events: {
		"submit form#post-form": "createPost",
		"click .x": "deletePost"
	},
	
	createPost: function () {
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		this.posts.create(params, { wait: true, sort: true });
	},
	
	deletePost: function () {
		var $post = $(event.target).closest("li");
		var postId = $post.attr("data-id");
		var post = this.posts.get(postId);

		post.destroy();
	},
	
	render: function () {
		var content = this.template({
			post: this.post,
			signedIn: !!CONZQ.currentUser,
			isThisUser: CONZQ.currentUser.id === this.user.id
		});
		
		this.$el.html(content);
		return this;
	}
});