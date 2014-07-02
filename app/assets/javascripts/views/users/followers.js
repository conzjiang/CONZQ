CONZQ.Views.Followers = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.followers = options.followers;
		
		if (CONZQ.currentUser) this.currentUser = CONZQ.currentUser;
	},
	
	tagName: "ul",
	
	className: "follows",
	
	template: JST["users/followers"],
	
	events: {
		"click #follow-status": "changeFollowStatus"
	},
	
	changeFollowStatus: function () {
		var $followButton = $(event.target);
		var $userContainer = $followButton.closest("#follow");
		var idolId = $userContainer.attr("data-id");
		var view = this;
		
		view.currentUser.save({ idol_id: idolId }, {
			success: function () {
				var $otherButton;
				
				if ($followButton.html() === "Follow") {
					view.followers.add(view.currentUser);
					view.currentUser.idols().add(view.user);

					$otherButton = $userContainer.find(".is-following");
					
				} else {
					view.followers.remove(view.currentUser);
					view.currentUser.idols().remove(view.user);
					
					$otherButton = $userContainer.find(".add-follow");
				}
				
				$followButton.addClass("hide");
				$otherButton.removeClass("hide");
			}
		});
	},
	
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
			
			if (view.currentUser.idols().contains(follower)) {
				$addFollow.addClass("hide");
			} else {
				$isFollowing.addClass("hide");
			}
		});
	}
})