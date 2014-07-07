CONZQ.Views.IndexView = Backbone.View.extend({
	initialize: function (options) {
		this.currentlyShows = options.currentlyShows;
		this.tvViews = [];
	},
	
	template: JST["index"],
	
	render: function () {
		var content = this.template({
			currentlyShows: this.currentlyShows
		});
		this.$el.html(content);
		return this;
	}
});