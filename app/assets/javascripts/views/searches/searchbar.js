CONZQ.Views.Searchbar = Backbone.View.extend({
	initialize: function (options) {
		this.$el = options.$sidebar;
	},
	
	template: JST["search/sidebar"],
	
	events: {
		"click .label": "select",
		"submit form": "runSearch"
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
	
	select: function () {
		$(event.target).parent().toggleClass("selected");
	},
	
	render: function () {
		var decades = {
	    "1": "50",
	    "2": "60",
	    "3": "70",
	    "4": "80",
	    "5": "90",
	    "6": "00",
	    "7": "10"
	  }
		
		var genres = {
	    "1": "Action",
	    "2": "Animated",
	    "3": "Comedy",
	    "4": "Crime",
	    "5": "Drama",
	    "6": "Live-Action",
	    "7": "Period",
	    "8": "Procedural",
	    "9": "Sci-Fi",
	    "10": "Scripted",
	    "11": "Serialized",
	    "12": "Thriller",
	    "13": "Unscripted/Reality",
	    "14": "Western",
	    "15": "Single-camera",
	    "16": "Multi-camera"
	  }
		
		this.$el.html(this.template({
			decades: decades,
			genres: genres
		}));
		
		return this;
	}
});