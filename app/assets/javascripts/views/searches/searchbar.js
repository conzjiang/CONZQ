CONZQ.Views.Searchbar = Backbone.View.extend({
	initialize: function (options) {
		this.$el = options.$sidebar;
	},
	
	template: JST["search/bar"],
	
	render: function () {
		this.$el.html(this.template());
		return this;
	}
});