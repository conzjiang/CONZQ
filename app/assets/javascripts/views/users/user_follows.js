CONZQ.Views.UserFollows = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
		this.followers = options.followers;
		this.idols = options.idols;
	},
	
	template: JST["users/follows"],
	
	events: {
		"click u.unfocus": "toggleView"
	},
	
	toggleView: function () {
		var selection = $(event.target).html();
		var view, $other;
		
		switch(selection) {
			case "Followers":
				view = new CONZQ.Views.Followers({ 
					followers: this.followers,
					user: this.user
				});
				
				$other = this.$el.find("#idols");
				break;
			case "Followings":
				// view = new CONZQ.Views.Idols({ idols: this.idols });
				$other = this.$el.find("#followers");
				break;
		}
		
		selection.removeClass("unfocus");
		$other.addClass("unfocus");
		this._swapViews(view);
	},
	
	render: function () {
		this.$el.html(this.template());
		
		var followersView = new CONZQ.Views.Followers({
			followers: this.followers
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