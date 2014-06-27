CONZQ.Views.TvShowView = Backbone.View.extend({
  initialize: function (options) {

  },

  template: JST["tv/show"],

  render: function () {
    var content = this.template({ tv: this.model });
    this.$el.html(content);
    return this;
  }
});