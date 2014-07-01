CONZQ.Views.UserWall = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.posts = this.user.posts();
		
		this.listenTo(this.posts, "sync add remove", this.render);
	},
	
	template: JST["users/wall"],
	
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
			
			user: this.user,
			userShowlist: this.user.showlist(),
			posts: this.posts,
			signedIn: CONZQ.currentUser.id === this.user.id
		
		});
		
		this.$el.html(content);
		return this;
	}
});