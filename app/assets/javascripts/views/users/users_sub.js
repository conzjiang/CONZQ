CONZQ.Views.UsersSubView = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.usersList = options.usersList;
		this.userShowView = options.userShowView;
		
		if (CONZQ.currentUser) this.currentUser = CONZQ.currentUser;
		
		this.listenTo(this.user.followers(), "add remove", this.render);
		this.listenTo(this.user.idols(), "add remove", this.render);
	},
	
	tagName: "ul",
	
	className: "users-list",
	
	template: JST["users/subview"],
	
	events: {
		"click #follow-status": "changeFollowStatus",
		"mouseover .is-following": "confirmUnfollow",
		"mouseleave .is-following": "resetButton"
	},
	
	changeFollowStatus: function () {
		this.userShowView.stopListening(this.user);
		
		var $followButton = $(event.target);
		var $userContainer = $followButton.closest("#follow");
		var idolId = $userContainer.attr("data-id");
		
		var view = this;
		
		view.currentUser.save({ idol_id: idolId }, {
			patch: true,
			success: function () {
				var $otherButton;
				var idol = CONZQ.users.getOrFetch(idolId);
				
				idol.fetch({
					success: function () {
						if ($followButton.hasClass("add-follow")) {
							idol.followers().add(view.currentUser);
							view.currentUser.idols().add(idol);

							$otherButton = $userContainer.find(".is-following");
					
						} else {
							idol.followers().remove(view.currentUser);
							view.currentUser.idols().remove(idol);
					
							$otherButton = $userContainer.find(".add-follow");
						}
						
						$followButton.addClass("hide");
						$otherButton.removeClass("hide");
						view.userShowView.listenTo(view.user, 
																			 "sync", view.userShowView.render);
					}
				});
			}
		});
	},
	
	confirmUnfollow: function () {
		$(event.target).html("Unfollow?");
	},
	
	resetButton: function () {
		$(event.target).html("Following");
	},
	
	render: function () {
		var content = this.template({ usersList: this.usersList });
		this.$el.html(content);
		if (this.currentUser) this._applyFollowStatus();
		
		return this;
	},
	
	_applyFollowStatus: function () {
		var view = this;
		
		view.usersList.each(function (follower) {
			var $userContainer = view.$el.find("li[data-id='" + follower.id + "']");
			var $addFollow = $userContainer.find("#follow-status.add-follow");
			var $isFollowing = $userContainer.find("#follow-status.is-following");
			
			if (view.currentUser.idols().contains(follower)) {
				$addFollow.addClass("hide");
			} else {
				$isFollowing.addClass("hide");
			}
		});
	}
})