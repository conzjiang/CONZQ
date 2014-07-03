CONZQ.Models.Search = Backbone.Model.extend({
	url: 'api/search',
	
	results: function () {
		if (!this._results) {
			this._results = new CONZQ.Collections.TvShows();
		}
		
		return this._results;
	}
});