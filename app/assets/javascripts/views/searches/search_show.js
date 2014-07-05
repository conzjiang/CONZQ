CONZQ.Views.SearchShow = Backbone.View.extend({
	initialize: function (options) {
		this.search = options.search;
		this.results = options.results;
		this.resultViews = [];
		
		this.listenTo(this.search, "sync", this.render);
	},
	
	template: JST["search/show"],
	
	events: {
		"submit form#sort": "sort"
	},
	
	sort: function () {
		event.preventDefault();

		var comparator = $(event.target).serializeJSON().search.sort_by;

		if (_(comparator).contains("Z")) {
			this.results = _.sortBy(this.results, function (show) {
				return show.title;
			});

			if (comparator === "Z-A") this.results.reverse();
			this.search.trigger("sync");

		} else {
			this.results = _.sortBy(this.results, function (show) {
				return show.rating;
			});

			if (comparator === "Highest Rating") this.results.reverse();
			this.search.trigger("sync");
		}
	},
	
	render: function () {
		var view = this;
		var resultsExist = view.results instanceof Object;
		
		view.$el.html(view.template({ resultsExist: resultsExist }));
		
		if (resultsExist) {
			_(view.results).each(function (show) {
				var resultView = new CONZQ.Views.SearchResult({ tv: show });
			
				view.$el.find("ul.results").append(resultView.render().$el);
				view.resultViews.push(resultView);
			});
		}
		
		return view;
	},
	
	remove: function () {
		_(this.resultViews).each(function (view) { view.remove(); });
		
		return Backbone.View.prototype.remove.apply(this);
	}
});