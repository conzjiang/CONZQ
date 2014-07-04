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
		var formData = $(event.target).serializeJSON();
		var that = this;
		
		this.user.save(formData.user);
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
					favorites: this.user.favorites() 
				});
				
				break;
			case "Follows":
				view = new CONZQ.Views.UserFollows({ user: this.user });
				break;
			default:
				view = new CONZQ.Views.UserWall({ user: this.user });
				break;
		}
		
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
		
		var userWallView = new CONZQ.Views.UserWall({ user: this.user });
		this._swapViews(userWallView);
		
		return this;
	},
	
	_swapViews: function (view) {
		if (this._currentView) this._currentView.remove();
		this._currentView = view;
		this.$el.find("section.user-container").html(view.render().$el);
	}
});