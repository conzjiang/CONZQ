CONZQ.Views.ListSubView = Backbone.View.extend({
	initialize: function (options) {
		this.list = options.list;
		this.userShowView = options.userShowView;
		this.statusViews = [];
		
		this.listenTo(this.list, "add remove", this.render);
	},
	
	tagName: "ul",
	
	className: "watchlist group",
	
	template: JST["watchlists/sublist"],
	
	events: {
		"click .x": "deleteView",
		"click button#delete": "deleteFromList",
		"click button#cancel": "cancelDelete"
	},
	
	deleteView: function () {
		$(event.target).closest("li#tv").addClass("delete");
	},
	
	deleteFromList: function () {
		var tvId = $(event.target).closest("li#tv").attr("data-id");
		var that = this;
		
		if (this.list.user.favorites() === this.list) {
			// FAVORITES
			this.userShowView.stopListening(this.userShowView.user);
			
			CONZQ.currentUser.save({ favorite: { tv_show_id: tvId } }, {
				patch: true,
				success: function () {
					that.list.remove({ id: tvId });
				}
			});
			
		} else {
			// WATCHLIST
			var watchlist = this.list.user.watchlists().findByTvId(tvId);
		
			watchlist.destroy({
				success: function () {
					that.list.remove({ id: tvId });
				}
			});
		}
	},
	
	cancelDelete: function () {
		$(event.target).closest("li#tv").removeClass("delete");
	},
	
	render: function () {
		var isThisUser;
		if (CONZQ.currentUser) {
			isThisUser = CONZQ.currentUser.id === this.list.user.id;
		}
		
		var content = this.template({
			list: this.list,
			isThisUser: isThisUser
		});
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
		if (this.userShowView && !$.isEmptyObject(this.userShowView._listeningTo)) {
			this.userShowView.listenTo(this.userShowView.user, "sync", this.render);	
		}
		
		_(this.statusViews).each(function (view) { view.remove(); });
		return Backbone.View.prototype.remove.apply(this);
	}
});