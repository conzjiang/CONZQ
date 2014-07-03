CONZQ.Views.SearchResult = Backbone.View.extend({
	initialize: function (options) {
		this.tv = options.tv;
		this.$el.attr("data-id", this.tv.id);
		this.statusesView = new CONZQ.Views.StatusesView({ tv: this.tv });
	},
	
	tagName: "li",
	
	className: "tv",
	
	id: "tv-result",
	
	template: JST["search/result"],
	
	render: function () {
		var content = this.template({ tv: this.tv });
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