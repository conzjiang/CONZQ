CONZQ.Views.UserShow = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.originalPhoto = this.user.get("photo_medium");
		
		this.listenTo(this.user, "sync", this.render);
	},
	
	template: JST["users/show"],
	
	events: {
		"click .edit-profile": "editView",
		"change #photo-upload": "photoPreview",
		"click .cancel-edit": "cancelEdit",
		"submit form#edit-user": "updateProfile",
		"click a#nav": "profileNav"
	},
	
	editView: function () {
		$(event.target).closest(".profile-info").addClass("edit");
	},
	
	photoPreview: function () {
		var that = this;
		var imageFile = event.target.files[0];
		var reader = new FileReader();
		
		reader.onloadend = function(){
		  that.user.set("photo", this.result);
		  that.$el.find("#profile-photo").attr("src", this.result);
		}
		
		if(imageFile){
		  reader.readAsDataURL(imageFile);
		} else {
		  this.$el.find("#profile-photo").attr("src", "");
		}
	},
	
	cancelEdit: function () {
		this.$el.find("#profile-photo").attr("src", this.originalPhoto);
		$(event.target).closest(".profile-info").removeClass("edit");
	},
	
	updateProfile: function () {
		event.preventDefault();
		
		var $container = $(event.target).parent();
		$container.addClass("save");
		
		var formData = $(event.target).serializeJSON();
		var that = this;
		
		this.user.save(formData.user, {
			success: function () {
				delete that.user.attributes.photo;
				$container.removeClass("save");
				that.originalPhoto = that.user.get("photo_medium");
			}
		});
	},
	
	profileNav: function () {
		event.preventDefault();
		var nav = $(event.target).attr("data-id");
		var view;
		
		switch(nav) {
			case "Watchlist":
				view = new CONZQ.Views.UserWatchlist({ user: this.user });
				break;
			case "Favorites":
				view = new CONZQ.Views.UserFavorites({ 
					favorites: this.user.favorites(),
					userShowView: this
				});
				break;
			case "Follows":
				view = new CONZQ.Views.UserFollows({
					user: this.user,
					userShowView: this
				});
				break;
			default:
				view = new CONZQ.Views.UserWall({ user: this.user });
				break;
		}
		
		$(event.target).closest("ul").find(".selected").removeClass("selected");
		$(event.target).parent().addClass("selected");
		this._swapViews(view);
	},
	
	render: function () {
		var isThisUser;
		if (CONZQ.currentUser) isThisUser = CONZQ.currentUser.id === this.user.id;
		
		var content = this.template({
			user: this.user,
			isThisUser: isThisUser
		});
		this.$el.html(content);
		
		if (CONZQ.currentUser && CONZQ.currentUser.id !== this.user.id) {
			var $followStatuses = this.$el.find("#follow-statuses");
			
			this.followStatView = new CONZQ.Views.FollowStatus({
				user: this.user,
				userShowView: this
			});
			$followStatuses.prepend(this.followStatView.render().$el);
			
			if (!CONZQ.currentUser.followers().contains(this.user)) {
				$followStatuses.find("#follows-you").addClass("hide");
			}
		}
		
		var userWallView = new CONZQ.Views.UserWall({ user: this.user });
		this._swapViews(userWallView);
		
		return this;
	},
	
	_swapViews: function (view) {
		if (this._currentView) this._currentView.remove();
		this._currentView = view;
		this.$el.find("section.user-container").html(view.render().$el);
	},
	
	remove: function () {
		if (this.followStatView) this.followStatView.remove();
		return Backbone.View.prototype.remove.apply(this);
	}
});