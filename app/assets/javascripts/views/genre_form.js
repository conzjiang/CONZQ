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
		$label.toggleClass("red");
	},
	
	render: function () {
		var content = this.template({ genres: this.restGenres });
		this.$el.html(content);
		
		var that = this;
		_(this.genres).each(function (genre) {
			var $checkbox = that.$el.find("input#" + genre);
			$checkbox.prop("checked", true);
			$checkbox.parent().find("label").addClass("red");
		});
		
		return this;
	}
});


