CONZQ.Subsets.Favorites = Backbone.Subset.extend({
	initialize: function (models, options) {
		this.user = options.user;
	},
	
	comparator: function (fav) {
		return fav.get("title");
	}
});