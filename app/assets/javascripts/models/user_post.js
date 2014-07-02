CONZQ.Models.UserPost = Backbone.Model.extend({
	comments: function () {
		if (!this._comments) {
			this._comments = new CONZQ.Collections.PostComments({ post: this });
		}
		
		return this._comments;
	},
	
	parse: function (response) {
		if (response.comments) {
			this.comments().set(response.comments);
			delete response.comments;
		}
		
		return response;
	}
});