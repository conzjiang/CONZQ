CONZQ.Views.SearchShow = Backbone.View.extend({
	initialize: function (options) {
		
	},
	
	events: {
		"click li#status": "changeWatchStatus"
	},
	
	changeWatchStatus: function () {
		
	},
	
	template: JST["tv/result"],
	
  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
		
		if (CONZQ.currentUser) {
			var $resultContainer = this.$el.find("li#tv[data-id='" +
														 this.model.id + "']");
														 
			if (CONZQ.currentUser.watchlists().getOrFetch(this.model.id)) {
				var stat = 
					CONZQ.currentUser.attributes.watchlist_statuses[this.model.id];
				
				var $watching = $resultContainer.find("li#watchlist");
				var $userStatus = $resultContainer.find("li#status[data-id='" +
													stat + "']");
													
				$watching.addClass("on-watchlist");
				$userStatus.addClass("user-status");
			}
			
			if (CONZQ.currentUser.favorites().getOrFetch(this.model.id)) {
				var $heart = $resultContainer.find("li#favorite");
				$heart.addClass("is_favorite");
			}
		}

    return this;
  }
});