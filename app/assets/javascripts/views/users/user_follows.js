CONZQ.Views.UserFollows = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		
		this.followers = this.user.followers();
		this.idols = this.user.idols();
	},
	
	template: JST["users/follows"],
	
	events: {
		"click u.unfocus": "toggleView"
	},
	
	toggleView: function () {
		var $selection = $(event.target);
		var view, $other;
		
		switch($selection.html()) {
			case "followers":
				view = new CONZQ.Views.UsersSubView({ 
					user: this.user,
					usersList: this.followers 
				});
				
				$other = this.$el.find("#idols");
				break;
			case "followings":
				view = new CONZQ.Views.UsersSubView({
					user: this.user,
					usersList: this.idols
				});
				
				$other = this.$el.find("#followers");
				break;
		}
		
		$selection.removeClass("unfocus");
		$other.addClass("unfocus");
		this._swapViews(view);
	},
	
	render: function () {
		this.$el.html(this.template());
		
		var followersView = new CONZQ.Views.UsersSubView({
			user: this.user,
			usersList: this.followers
		});
		
		this._swapViews(followersView);
		
		return this;
	},
	
	_swapViews: function (view) {
		if (this._currentView) this._currentView.remove();
		this._currentView = view;
		this.$el.find("section#sub-container").html(view.render().$el);
	},
	
	remove: function () {
		this._currentView.remove();
		return Backbone.View.prototype.remove.apply(this);
	}
});