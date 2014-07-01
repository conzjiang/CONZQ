CONZQ.Views.SearchResult = Backbone.View.extend({
	// model = TV Show
	
	initialize: function (options) {
		this.$el.attr("data-id", this.model.id);
		
		this.statusesView = new CONZQ.Views.StatusesView({ tv: this.model });
	},
	
	tagName: "li",
	
	className: "tv",
	
	id: "tv-result",
	
	template: JST["search/result"],
	
	render: function () {
		var content = this.template({ tv: this.model });
		this.$el.html(content);
		this.$el.find("div#statuses-container").html(
			this.statusesView.render().$el
		);
		
		return this;
	},
	
	remove: function () {
		this.statusesView.remove();
		
		return Backbone.View.prototype.remove.apply(this);
	}
});