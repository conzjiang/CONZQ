json.extract! user, :id, :username, :email, :watchlist_statuses, :created_at, :updated_at
json.watchlists user.watchlists, partial: 'api/watchlist', as: :watchlist
json.favorites user.favorite_shows, partial: 'api/tv_show', as: :tv_show
json.posts user.posts, partial: 'api/posts/post', as: :post