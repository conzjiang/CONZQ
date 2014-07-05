CONZQ.Views.UserFavorites = Backbone.View.extend({
	initialize: function (options) {
		this.favorites = options.favorites;
		this.userShowView = options.userShowView;
	},
	
	template: JST["users/favorites"],
	
	render: function () {
		var content = this.template({ favorites: this.favorites });
		this.$el.html(content);
		
		this.listView = new CONZQ.Views.ListSubView({
			list: this.favorites,
			userShowView: this.userShowView
		});
		this.$el.find("section#list-container").html(this.listView.render().$el);
		
		return this;
	},
	
	remove: function () {
		this.listView.remove();
		return Backbone.View.prototype.remove.apply(this);
	}
});