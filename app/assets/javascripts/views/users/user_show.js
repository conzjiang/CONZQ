CONZQ.Views.UserShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model.posts(), "sync add", this.render);
	},
	
	template: JST["users/show"],
	
	events: {
		"submit form#post-form": "createPost"
	},
	
	createPost: function () {
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		var posts = this.model.posts();
		
		posts.create(params, {
			success: function (post) {
				posts.add(post);
			}
		});
	},
	
	render: function () {
		var content = this.template({
			
			user: this.model,
			userShowlist: this.model.showlist(),
			posts: this.model.posts(),
			signedIn: CONZQ.currentUser.id === this.model.id
		
		});
		
		this.$el.html(content);
		return this;
	}
});