# ADD ME AS ADMIN
conz = User.new(username: "conz", email: "conzjiang@gmail.com", admin: true)
conz.password = "green1"
conz.save!

# GENRES
genres = ["Action", "Animated", "Comedy", "Crime", "Drama", "Live-Action", "Period", "Procedural", "Sci-Fi", "Scripted", "Serialized", "Thriller", "Unscripted/Reality", "Western", "Single-camera", "Multi-camera"]

genres.each do |genre|
  Genre.create!(name: genre)
end

# DECADES
[50, 60, 70, 80, 90, 00, 10].each do |decade|
  Decade.create!(years: decade)
end

# INITIAL SHOWS
shows = ["Arrested Development", "Mad Men", "Orphan Black", "It's Always Sunny in Philadelphia", "Archer", "Breaking Bad", "Gunsmoke", "All in the Family", "Law & Order"]

shows.each do |show|
  tv = TvShow.new(title: show)
  tv.auto_complete
  tv.apply_imdb_rating
  tv.assign_decade
  tv.admin = conz
  tv.status = "Currently Airing"
  tv.save!
end

ad = TvShow.find(1)
ad.blurb = "Level-headed son Michael Bluth takes over family affairs after his father is imprisoned, but the rest of his spoiled, dysfunctional family are making his job unbearable."
ad.status = "Ended"
ad.network = "FOX/Netflix"
ad.genre_ids = [3, 6, 10, 15]
ad.save!

mm = TvShow.find(2)
mm.genre_ids = [5, 6, 7, 10, 11]
mm.save!

ob = TvShow.find(3)
ob.network = "BBC America"
ob.genre_ids = [5, 6, 9, 10, 11, 12]
ob.save!

sunny = TvShow.find(4)
sunny.network = "FX/FXX"
sunny.genre_ids = [3, 6, 10, 15]
sunny.save!

archer = TvShow.find(5)
archer.genre_ids = [1, 2, 3, 10]
archer.save!

bb = TvShow.find(6)
bb.status = "Ended"
bb.genre_ids = [4, 5, 6, 10, 11]
bb.save!

gs = TvShow.find(7)
gs.status = "Ended"
gs.genre_ids = [5, 6, 7, 10, 14]
gs.save!

family = TvShow.find(8)
family.status = "Ended"
family.genre_ids = [3, 6, 10, 16]
family.save!

lo = TvShow.find(9)
lo.status = "Ended"
lo.genre_ids = [4, 5, 6, 8, 10]
lo.save!

conz.favorite_shows = [ad, ob, sunny, archer]
conz.save!

[ad, mm, ob, sunny, archer].each do |show|
  Watchlist.create!(
    tv_show_id: show.id,
    user_id: conz.id,
    status: "Currently Watching")
end

Watchlist.create!(tv_show_id: bb.id, user_id: conz.id, status: "Completed")
Watchlist.create!(tv_show_id: family.id, user_id: conz.id, status: "Dropped")