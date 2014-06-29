CONZQ.Views.TvShowView = Backbone.View.extend({
  initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
  }

  template: JST["tv/show"],

  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
    return this;
  }
});