CONZQ.Views.UserShow = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user;
	},
	
	template: JST["users/show"],
	
	events: {
		"click a#nav": "profileNav",
	},
	
	profileNav: function () {
		var nav = $(event.target).attr("data-id").toLowerCase();
		
	},
	
	
	
	render: function () {
		var content = this.template({ user: this.user });
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