CONZQ.Views.SearchShow = Backbone.View.extend({
	initialize: function (options) {
		this.watchlist = CONZQ.currentUser.watchlists();	
	},
	
	events: {
		"click li#status": "changeWatchStatus"
	},
	
	changeWatchStatus: function () {
		event.preventDefault();
		var $newStatus = $(event.target);
		var that = this;
		
		if (!CONZQ.currentUser) {
			// modal that says you must be signed in?
		} else if (!$newStatus.hasClass("user-status")) {
			var params = { watchlist: {
				"tv_show_id": this.model.id,
				"status": $newStatus.attr("data-id")
			}};
			
			that.watchlist.create(params, {
				success: function (newWatchlist) {
					that.watchlist.add(newWatchlist);
					
					var $statusContainer = that.$el.find("li#tv[data-id='" + 
																 that.model.id + "']");
					var $watchIcon = $statusContainer.find("li#watchlist");
					
					var $userStatus = $statusContainer.find("li#status[data-id='" +
														newWatchlist.get("status") + "']");
														
					$watchIcon.addClass("on-watchlist");
					$userStatus.addClass("user-status");
				}
			});
		}
		
	},
	
	template: JST["tv/result"],
	
  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
		
		if (CONZQ.currentUser) {										 
			if (this.watchlist.getOrFetch(this.model.id)) {
				var stat = 
					CONZQ.currentUser.attributes.watchlist_statuses[this.model.id];
				
				var $statusContainer = this.$el.find("li#tv[data-id='" + 
															 this.model.id + "']");
				var $watchIcon = $statusContainer.find("li#watchlist");
				var $userStatus = $statusContainer.find("li#status[data-id='" +
													stat + "']");
												
				$watchIcon.addClass("on-watchlist");
				$userStatus.addClass("user-status");
			}
			
			// if (CONZQ.currentUser.favorites().getOrFetch(this.model.id)) {
// 				var $heart = $resultContainer.find("li#favorite");
// 				$heart.addClass("is_favorite");
// 			}
		}

    return this;
  }
});