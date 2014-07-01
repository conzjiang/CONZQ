json.extract! user, :id, :username
json.currentCount user.currently_watching_shows.count
json.favoritesCount user.favorites.count