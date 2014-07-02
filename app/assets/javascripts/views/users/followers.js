CONZQ.Views.Followers = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.followers = options.followers;
		
		if (CONZQ.currentUser) this.currentUser = CONZQ.currentUser;
	},
	
	tagName: "ul",
	
	className: "follows",
	
	events: {
		"click .add-follow": "follow"
	},
	
	follow: function () {
		var $followButton = $(event.target);
		var idolId = $followButton.closest("#follow").attr("data-id");
		var view = this;
		
		view.currentUser.save({ idol_id: idolId }, {
			success: function () {
				view.followers.add(view.currentUser);
				view.currentUser.followings.add(view.user);
				
				$followButton.addClass("hide");
				$followButton.closest(".is-following").removeClass("hide");
			}
		});
		
	},
	
	template: JST["users/followers"],
	
	render: function () {
		var content = this.template({ followers: this.followers });
		this.$el.html(content);
		
		if (this.currentUser) this._applyFollowStatus();
		
		return this;
	},
	
	_applyFollowStatus: function () {
		var view = this;
		view.followers.each(function (follower) {
			var $userContainer = view.$el.find("li[data-id='" + follower.id + "']");
			var $addFollow = $userContainer.find("div#follow-status.add-follow");
			var $isFollowing = $userContainer.find("div#follow-status.is-following");
			
			if (_(view.currentUser.followers()).contains(follower)) {
				$addFollow.addClass("hide");
			} else {
				$isFollowing.addClass("hide");
			}
		});
	}
})