# encoding: utf-8

# ADD ME AS ADMIN
conz = User.new(username: "conz", admin: true)
conz.password = "green1"
conz.save

# GENRES
genres = ["Action", "Animated", "Comedy", "Crime", "Drama", "Period", "Procedural", "Reality", "Sci-Fi", "Scripted", "Serialized", "Thriller", "Western"]

genres.each do |genre|
  Genre.create(name: genre)
end

# DECADES
[50, 60, 70, 80, 90, 00, 10].each do |decade|
  Decade.create(years: decade)
end

# INITIAL SHOWS
shows = ["Arrested Development", "Breaking Bad", "Mad Men", "Orphan Black", "It's Always Sunny in Philadelphia", "Archer", "Gunsmoke", "All in the Family", "Law and Order"]

shows.each do |show|
  tv = TvShow.new(title: show)
  tv.auto_complete
  tv.apply_imdb_rating
  tv.assign_decade
  tv.save
end