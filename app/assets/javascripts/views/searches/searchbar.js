CONZQ.Views.Searchbar = Backbone.View.extend({
	initialize: function (options) {
		this.model = new CONZQ.Models.Search();
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
		
		this.model.save(params, {
			success: function (data) {
				var results = _(data.attributes).filter(function (obj) {
					return obj.id;
				});
				
				var searchShowView = new CONZQ.Views.SearchShow({
					collection: results
				});
				
				CONZQ.appRouter.displaySearch(searchShowView);
			},
			
			error: function (data) {
				console.log("hit error in Searchbar View runSearch")
				debugger
			}
		});
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