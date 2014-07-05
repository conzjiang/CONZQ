CONZQ.Views.StatusesView = Backbone.View.extend({
	initialize: function (options) {
		this.tv = options.tv;
		
		if (CONZQ.currentUser) {
			this.user = CONZQ.currentUser;
			this.watchlist = this.user.watchlists();
		}
	},
	
	tagName: "ul",
	
	className: "statuses group",
	
	template: JST["statuses"],
	
	events: {
		"click li#status": "changeWatchStatus",
		"click li#favorite": "toggleFav"
	},
	
	changeWatchStatus: function () {
		var $newStatus = $(event.target);
		var view = this;
		
		if (!view.user) {
			view._displayMessage($newStatus, 
				"You must be logged in to do view!", "login-error");
				
		} else if (!$newStatus.hasClass("user-status")) {
			
			var params = { watchlist: {
				"tv_show_id": view.tv.id,
				"status": $newStatus.attr("data-id")
			}};
			
			var $currentStatus = view.$el.find(".user-status");
			
			if ($currentStatus.length > 0) {
				var existingWatchlist = view.watchlist.find(function (watch) {
					return watch.get("tv_show_id") === view.tv.id;
				});
				
				existingWatchlist.save(params, {
					success: function () {
						$currentStatus.removeClass("user-status");
						view._applyStatus(existingWatchlist.get("status"));
						view._displayMessage($newStatus, "Watchlist updated.", "display");
					}
				});
				
			} else {
				view.watchlist.create(params, {
					success: function (newWatchlist) {
						view.watchlist.add(newWatchlist);
						view._applyStatus(newWatchlist.get("status"));
						view._displayMessage($newStatus, 
							"Added to your watchlist!", "display");
					}
				});
			}
		}
	},
	
	toggleFav: function () {
		var $heartIcon = $(event.target);
		var favoriteParams = { favorite: {	tv_show_id: this.tv.id } };
		var view = this;
		
		if (!view.user) {
			view._displayMessage($heartIcon, 
				"You must be logged in to do view!", "login-error");
			
		} else {
			view.user.save(favoriteParams, {
				patch: true,
				success: function () {
					$heartIcon.toggleClass("is-favorite");
					
					if ($heartIcon.hasClass("is-favorite")) {
						view._displayMessage($heartIcon, "Added to favorites!", "display");
								
					} else {
						view._displayMessage($heartIcon, 
							"Removed from favorites.", "display");
					}
				}
			});
		}
	},
	
  render: function () {
    var content = this.template({ tv: this.tv });
    this.$el.html(content);
		
		if (this.user) {
			var tvId = this.tv.id;
			
			if (this.watchlist.getOrFetch(tvId)) {
				this._applyStatus(this.user.watchlistStatuses[tvId]);
			}
			
			if (this.user.favorites().get(tvId)) {
				var $heartIcon = this.$el.find("li#favorite");
				$heartIcon.addClass("is-favorite");
			}
		}

    return this;
  },
	
	_applyStatus: function (stat) {
		var $watchIcon = this.$el.find("li#watchlist");
		var $userStatus = this.$el.find("li#status[data-id='" + stat + "']");
										
		$watchIcon.addClass("on-watchlist");
		$userStatus.addClass("user-status");
	},
	
	_displayMessage: function ($target, message, messageClass) {
		var $messageBox = this.$el.find("li#message");
		$messageBox.fadeIn("slow");
		$messageBox.addClass(messageClass).html(message);
		
		setTimeout(function () {
			$messageBox.fadeOut("slow", function () {
				$messageBox.removeClass(messageClass).empty();
			});
		}, 3000);
	}
});