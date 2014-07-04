CONZQ.Subsets.Followers = Backbone.Subset.extend({
	contains: function (user) {
		return this.find(function (follower) {
			return follower.id == user.id;
		});
	}
});