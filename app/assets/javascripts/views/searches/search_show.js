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
		
		if (CONZQ.currentUser && 
				CONZQ.currentUser.watchlists().getOrFetch(this.model.id)) {
			var $resultContainer = this.$el.find("li#tv[data-id='" + 
														 this.model.id + "']");
			var stat = CONZQ.currentUser.attributes.watchlist_statuses[this.model.id];
			
			var $userStatus = $resultContainer.find("li#status[data-id='" + 
												stat + "']");
			$userStatus.addClass("user-status");
		}

    return this;
  }
});