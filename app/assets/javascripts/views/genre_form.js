CONZQ.Views.GenreForm = Backbone.View.extend({
	initialize: function (options) {
		this.genres = options.genres;
		this.restGenres = options.restGenres;
	},
	
	template: JST["genre_form"],
	
	events: {
		"click label": "highlightLabel"
	},
	
	highlightLabel: function () {
		var $label = $(event.target);
		$label.toggleClass("selected");
	},
	
	render: function () {
		var content = this.template({ genres: this.restGenres });
		this.$el.html(content);
		
		var that = this;
		_(this.genres).each(function (genre) {
			var genreId = genre;
			if (genre === "Sci-Fi/Fantasy") genreId = "Sci-Fi";
			
			var $checkbox = that.$el.find("input#" + genreId);
			$checkbox.prop("checked", true);
			$checkbox.parent().find("label[for='"+ genreId + "']")
												.addClass("selected");
		});
		
		return this;
	}
});


