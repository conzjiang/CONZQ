CONZQ.Views.UserWall = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.posts = this.user.posts();
		this.postViews = [];
		
		this.listenTo(this.posts, "add remove", this.render);
	},
	
	template: JST["users/wall"],
	
	events: {
		"submit form#post-form": "createPost"
	},
	
	createPost: function () {
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		
		this.posts.create(params, { wait: true, sort: true });
	},
	
	render: function () {
		var isThisUser;
		if (CONZQ.currentUser) isThisUser = CONZQ.currentUser.id === this.user.id;
		
		var content = this.template({
			
			user: this.user,
			userShowlist: this.user.showlist(),
			posts: this.posts.length > 0,
			isThisUser: isThisUser
		
		});
		
		this.$el.html(content);
		
		var $postsUl = this.$el.find("ul.posts");
		var postViews = this.postViews;
		var that = this;
		
		that.posts.each(function (post) {
			var postView = new CONZQ.Views.Post({
				user: that.user,
				post: post
			});
			
			$postsUl.append(postView.render().$el);
			postViews.push(postView);
		});
		
		return this;
	},
	
	remove: function () {
		_(this.postViews).each(function (view) { view.remove(); });
		return Backbone.View.prototype.remove.apply(this);
	}
});