json.extract! watchlist_show, :id, :title
json.photo_thumb watchlist_show.photo.url(:thumb)