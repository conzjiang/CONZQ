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
    return this;
  }
});