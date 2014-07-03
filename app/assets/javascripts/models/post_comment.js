CONZQ.Models.PostComment = Backbone.Model.extend({
	parse: function (response) {
		if (response.commenter) {
			this.commenter = response.commenter;
			delete response.commenter;
		}
		
		return response;
	}
});