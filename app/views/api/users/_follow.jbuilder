json.extract! user, :id, :username
json.photo_thumb user.photo.url(:thumb)
json.currentCount user.currently_watching_shows.count
json.favoritesCount user.favorites.count