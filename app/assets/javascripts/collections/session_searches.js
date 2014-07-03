CONZQ.Collections.SessionSearches = Backbone.Collection.extend({
	model: CONZQ.Models.Search,
	
	url: 'api/search',
	
	prevSearch: function (params) {
		var searchParams = params.search;
		
		return this.find(function (prevQuery) {
			var prevSearchParams = prevQuery.get("search");
			
			var decadeIds = _.isEqual(prevSearchParams.decade_ids,
																searchParams.decade_ids);
			var genreIds = _.isEqual(prevSearchParams.genre_ids,
															 searchParams.genre_ids);
			var stat = prevSearchParams.status === searchParams.status;
			
			return decadeIds && genreIds && stat;
		});
	}
});