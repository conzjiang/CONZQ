CONZQ.Views.SearchShow = Backbone.View.extend({
	initialize: function (options) {
		this.watchlist = CONZQ.currentUser.watchlists();
	},
	
	events: {
		"click li#status": "changeWatchStatus",
		"click li#favorite": "toggleFav"
	},
	
	changeWatchStatus: function () {
		var $newStatus = $(event.target);
		var that = this;
		
		if (!CONZQ.currentUser) {
			// modal that says you must be signed in?
		} else if (!$newStatus.hasClass("user-status")) {
			var params = { watchlist: {
				"tv_show_id": that.model.id,
				"status": $newStatus.attr("data-id")
			}};
			
			var $currentStatus = $newStatus.parent().children("li.user-status");
			
			if ($currentStatus.length > 0) {
				var existingWatchlist = that.watchlist.find(function (watch) {
					return watch.get("tv_show_id") == that.model.id;
				});
				
				existingWatchlist.save(params, {
					success: function () {
						$currentStatus.removeClass("user-status");
						that.applyStatus(existingWatchlist.get("status"));
					}
				});
			} else {
				that.watchlist.create(params, {
					success: function (newWatchlist) {
						that.watchlist.add(newWatchlist);
						that.applyStatus(newWatchlist.get("status"));
					}
				});
			}
		}
	},
	
	toggleFav: function () {
		var $heartIcon = $(event.target);
		var favorite_params = { favorite: {	tv_show_id: this.model.id }}
		var user = CONZQ.currentUser;
		
		user.save(favorite_params, {
			success: function () {
				if ($heartIcon.hasClass("is_favorite")) {
					$heartIcon.removeClass("is_favorite");
				} else {
					$heartIcon.addClass("is_favorite");
				}
			}
		});
	},
	
	template: JST["tv/result"],
	
  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
		
		if (CONZQ.currentUser) {
			var id = this.model.id;										 
			if (this.watchlist.getOrFetch(id)) {
				var stat = 
					CONZQ.currentUser.attributes.watchlist_statuses[id];
				
				this.applyStatus(stat);
			}
			
			if (CONZQ.currentUser.favorites().get(id)) {
				var $statusContainer = this.$el.find("li#tv[data-id='" + id + "']");
				var $heartIcon = $statusContainer.find("li#favorite");
				$heartIcon.addClass("is_favorite");
			}
		}

    return this;
  },
	
	applyStatus: function (statusSetting) {
		var id = this.model.id;
		
		var $statusContainer = this.$el.find("li#tv[data-id='" + id + "']");
		var $watchIcon = $statusContainer.find("li#watchlist");
		var $userStatus = $statusContainer.find("li#status[data-id='" +
											statusSetting + "']");
										
		$watchIcon.addClass("on-watchlist");
		$userStatus.addClass("user-status");
	}
});