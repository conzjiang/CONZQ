CONZQ.Views.UserFavorites = Backbone.View.extend({
	initialize: function (options) {
		this.favorites = options.favorites;
		
		this.statusViews = [];
	},
	
	template: JST["users/favorites"],
	
	render: function () {
		var content = this.template({ favorites: this.favorites });
		this.$el.html(content);
		
		var that = this;
		this.favorites.each(function (show) {
			var statusView = new CONZQ.Views.StatusesView({ tv: show });
			
			that.$el.find("div#statuses-container").html(statusView.render().$el);
			that.statusViews.push(statusView);
		});
		
		return this;
	},
	
	remove: function () {
		_(this.statusViews).each(function (view) { view.remove(); });
		
		return Backbone.View.prototype.remove.apply(this);
	}
});