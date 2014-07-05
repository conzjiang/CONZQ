CONZQ.Collections.Genres = Backbone.Collection.extend({
	model: CONZQ.Models.Genre,
	
	url: '/api/rest_genres'
});