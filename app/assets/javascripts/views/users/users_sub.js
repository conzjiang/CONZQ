CONZQ.Views.UsersSubView = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.usersList = options.usersList;
		this.userShowView = options.userShowView;
		this.statusViews = [];
		
		this.listenTo(this.user.followers(), "add remove", this.render);
		this.listenTo(this.user.idols(), "add remove", this.render);
	},
	
	tagName: "ul",
	
	className: "users-list group",
	
	template: JST["users/subview"],
	
	render: function () {
		var content = this.template({ usersList: this.usersList });
		this.$el.html(content);
		
		if (CONZQ.currentUser) {
			var that = this;
			
			this.usersList.each(function (user) {
				if (CONZQ.currentUser.id !== user.id) {
					var $userContainer = that.$el.find("li[data-id=" + user.id + "]");
					var $followStatuses = $userContainer.find("li.username");
					
					var followView = new CONZQ.Views.FollowStatus({
						user: user,
						userShowView: that.userShowView
					});
					
					$followStatuses.append(followView.render().$el);
					that.statusViews.push(followView);
				}
			});
		}
		
		return this;
	},
	
	remove: function () {
		_(this.statusViews).each(function (view) { view.remove(); });
		return Backbone.View.prototype.remove.apply(this);
	}
})