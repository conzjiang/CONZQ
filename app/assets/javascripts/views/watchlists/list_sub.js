CONZQ.Views.ListSubView = Backbone.View.extend({
	initialize: function (options) {
		this.list = options.list;
		
		this.statusViews = [];
	},
	
	tagName: "ul",
	
	className: "watchlist group",
	
	template: JST["watchlists/sublist"],
	
	render: function () {
		var content = this.template({ list: this.list });
		this.$el.html(content);
		
		var that = this;
		this.list.each(function (show) {
			var $showContainer = that.$el.find("li[data-id='" + show.id + "']");
			var $statusesContainer = $showContainer.find("div#statuses-container");
			var statusView = new CONZQ.Views.StatusesView({ tv: show });
			
			$statusesContainer.html(statusView.render().$el);
			that.statusViews.push(statusView);
		});
		
		return this;
	},
	
	remove: function () {
		_(this.statusViews).each(function (view) { view.remove(); });
		return Backbone.View.prototype.remove.apply(this);
	}
});