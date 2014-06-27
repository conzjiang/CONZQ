CONZQ.Models.TvShow = Backbone.Model.extend({
  initialize: function () {
    this.genres();
    this.decades();
  },

  urlRoot: "api/tv_shows",

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
  },

  genres: {
    if (!this._genres) {
      this._genres = new CONZQ.Collections.Genres({}, {
        show: this
      });
    }

    return this._genres;
  },

  decades: {
    if (!this._decades) {
      this._decades = new CONZQ.Collections.Decades({}, {
        show: this
      });
    }

    return this._decades;
  }
});