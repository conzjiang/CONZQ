CONZQ.Views.Searchbar = Backbone.View.extend({
  initialize: function (options) {
    this.$el = options.$sidebar;
  },

  template: JST["search/sidebar"],

  events: {
    "click label": "select",
    "submit form": "runSearch"
  },

  select: function () {
    $(event.target).toggleClass("selected");
  },

  runSearch: function () {
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var prevSearch = CONZQ.searches.prevSearch(params);
    var results;

    if (prevSearch) {
      results = prevSearch.get("results");

      var searchView = new CONZQ.Views.SearchShow({ results: results });
      CONZQ.appRouter._swapViews(searchView);
      Backbone.history.navigate("/search", { trigger: true });

    } else {
      $.ajax({
        type: "get",
        url: '/api/search',
        data: params,
        success: function (searchData) {
          var search = new CONZQ.Models.Search(searchData);
          CONZQ.searches.add(search);

          results = searchData.results;
          var searchView = new CONZQ.Views.SearchShow({
            search: search,
            results: results
          });

          CONZQ.appRouter._swapViews(searchView);
          Backbone.history.navigate("search");
        }
      });
    }
  },

  render: function () {
    this.$el.html(this.template({
      decades: CONZQ.categories.get("decades"),
      genres: CONZQ.categories.get("genres")
    }));

    return this;
  }
});
