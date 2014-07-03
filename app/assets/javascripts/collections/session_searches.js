CONZQ.Collections.SessionSearches = Backbone.Collection.extend({
	model: CONZQ.Models.Search,
	
	url: 'api/search',
	
	prevSearch: function (params) {
		var searchParams = params.search;
		debugger
		return this.find(function (prevQuery) {
			var prevSearchParams = prevQuery.get("search");
			
			var decadeIds = prevSearchParams.decade_ids === searchParams.decade_ids;
			var genreIds = prevSearchParams.genre_ids === searchParams.genre_ids;
			var stat = prevSearchParams.status === searchParams.status;
			
			return decadeIds && genreIds && stat;
		});
	}
});