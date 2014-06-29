CONZQ.Views.SearchResult = Backbone.View.extend({
	initialize: function (options) {
		this.$el.attr("data-id", this.model.id);
		
		if (CONZQ.currentUser) {
			this.user = CONZQ.currentUser;
			this.watchlist = this.user.watchlists();
		}
	},
	
	tagName: "li",
	
	id: "tv-result",
	
	template: JST["tv/result"],
	
	events: {
		"click li#status": "changeWatchStatus",
		"click li#favorite": "toggleFav"
	},
	
	changeWatchStatus: function () {
		var $newStatus = $(event.target);
		var that = this;
		
		if (!that.user) {
			that.displayMessage($newStatus, 
				"You must be logged in to do that!", "login-error");
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
						that.displayMessage($newStatus, "Watchlist updated.", "display");
					}
				});
			} else {
				that.watchlist.create(params, {
					success: function (newWatchlist) {
						that.watchlist.add(newWatchlist);
						that.applyStatus(newWatchlist.get("status"));
						that.displayMessage($newStatus, 
							"Added to your watchlist!", "display");
					}
				});
			}
		}
	},
	
	toggleFav: function () {
		var $heartIcon = $(event.target);
		var favorite_params = { favorite: {	tv_show_id: this.model.id } };
		var that = this;
		
		if (that.user) {
			that.user.save(favorite_params, {
				success: function () {
					if ($heartIcon.hasClass("is_favorite")) {
						$heartIcon.removeClass("is_favorite");
						that.displayMessage($heartIcon, 
							"Removed from favorites.", "display");
					} else {
						$heartIcon.addClass("is_favorite");
						that.displayMessage($heartIcon, "Added to favorites!", "display");
					}
				}
			});
		} else {
			that.displayMessage($heartIcon, 
				"You must be logged in to do that!", "login-error");
		}
	},
	
  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
		
		if (this.user) {
			var id = this.model.id;										 
			if (this.watchlist.getOrFetch(id)) {
				var stat = this.user.attributes.watchlist_statuses[id];
				
				this.applyStatus(stat);
			}
			
			if (this.user.favorites().get(id)) {
				var $heartIcon = this.$el.find("li#favorite");
				$heartIcon.addClass("is_favorite");
			}
		}

    return this;
  },
	
	applyStatus: function (stat) {
		var $watchIcon = this.$el.find("li#watchlist");
		var $userStatus = this.$el.find("li#status[data-id='" + stat + "']");
										
		$watchIcon.addClass("on-watchlist");
		$userStatus.addClass("user-status");
	},
	
	displayMessage: function ($target, message, messageClass) {
		var $messageBox = $target.closest(".statuses").find("li#message");
		$messageBox.fadeIn("slow");
		$messageBox.addClass(messageClass).html(message);
		
		setTimeout(function () {
			$messageBox.fadeOut("slow", function () {
				$messageBox.removeClass(messageClass).empty();
			});
		}, 3000);
	}
});