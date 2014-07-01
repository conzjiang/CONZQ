CONZQ.Views.UserShow = Backbone.View.extend({
	initialize: function () {
		this.posts = this.model.posts();
		
		this.listenTo(this.posts, "sync add remove", this.render);
	},
	
	template: JST["users/show"],
	
	events: {
		"submit form#post-form": "createPost",
		"click .x": "deletePost"
	},
	
	createPost: function () {
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		var posts = this.posts;

		posts.create(params, {
			success: function (post) {
				posts.add(post);
			}
		});
	},
	
	deletePost: function () {
		var $post = $(event.target).closest("li");
		var postId = $post.attr("data-id");
		var post = this.posts.get(postId);
		
		this.posts.remove(post);
		post.destroy();
	},
	
	render: function () {
		var content = this.template({
			
			user: this.model,
			userShowlist: this.model.showlist(),
			posts: this.posts,
			signedIn: CONZQ.currentUser.id === this.model.id
		
		});
		
		this.$el.html(content);
		return this;
	}
});