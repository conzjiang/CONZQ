CONZQ.Views.FollowStatus = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.userShowView = options.userShowView;
	},
	
	className: "inline",
	
	template: JST["follow_status"],
	
	events: {
		"mouseover .is-following": "confirmUnfollow",
		"mouseleave .is-following": "resetButton",
		"click #follow-status": "changeFollowStatus"
	},
	
	confirmUnfollow: function () {
		$(event.target).html("Unfollow?");
	},
	
	resetButton: function () {
		if (!$(event.target).hasClass("follow-placeholder")) {
			$(event.target).html("✓ Following");
		}
	},
	
	changeFollowStatus: function () {
		this.userShowView.stopListening(this.user);
		
		var $followButton = $(event.target);
		$followButton.addClass("follow-placeholder");
		var view = this;
		
		CONZQ.currentUser.save({ idol_id: this.user.id }, {
			patch: true,
			success: function () {
				
				setTimeout(function () {
					var $otherButton;
					
					if ($followButton.hasClass("add-follow")) {
						view.user.followers().add(CONZQ.currentUser);
						CONZQ.currentUser.idols().add(view.user);
					
						$otherButton = $followButton.parent().find(".is-following");
					
					} else {
						view.user.followers().remove(CONZQ.currentUser);
						CONZQ.currentUser.idols().remove(view.user);
					
						$otherButton = $followButton.parent().find(".add-follow");
					}
				
					$followButton.addClass("hide");
					$followButton.removeClass("follow-placeholder");
					$otherButton.removeClass("hide");
					
					view.userShowView.listenTo(view.user, 
																		 "sync", view.userShowView.render);
				}, 2000);
				
			}
		});
	},
	
	render: function () {
		this.$el.html(this.template());
		this._applyStatus();
		return this;
	},
	
	_applyStatus: function () {
		var $addFollow = this.$el.find("#follow-status.add-follow");
		var $isFollowing = this.$el.find("#follow-status.is-following");
		
		if (CONZQ.currentUser.idols().contains(this.user)) {
			$addFollow.addClass("hide");
		} else {
			$isFollowing.addClass("hide");
		}
	}
});