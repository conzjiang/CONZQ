CONZQ.Models.TvShow = Backbone.Model.extend({
  initialize: function () {
    this.genres();
    this.decades();
  },

  parse: function (response) {
    if (response["genres"]) {
      this.genres().set(response["genres"]);
      delete response["genres"];
    }

    if (response["decades"]) {
      this.decades().set(response["decades"]);
      delete response["decades"];
    }

    return response;
  }
});