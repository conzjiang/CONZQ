CONZQ.Collections.Users = Backbone.Collection.extend({
	model: CONZQ.Models.User,
	
	getOrFetch: function (id) {
    var users = this;

    var user;
    if (!(user = this.get(id))) {
      user = new CONZQ.Models.User({ id: id });

      user.fetch({
        success: function() { users.add(user); }
      });
		}

    return user;
	}
});