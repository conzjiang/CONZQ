json.extract! user, :id, :username, :email, :watchlist_statuses, :created_at, :updated_at

json.watchlists user.watchlists, partial: 'api/watchlist', as: :watchlist

json.currentShows user.currently_watching_shows, 
	partial: 'api/tv/watchlist_show', as: :watchlist_show
json.planToShows user.plan_to_watch_shows, 
	partial: 'api/tv/watchlist_show', as: :watchlist_show
json.completedShows user.completed_shows, 
	partial: 'api/tv/watchlist_show', as: :watchlist_show
json.droppedShows user.dropped_shows, 
	partial: 'api/tv/watchlist_show', as: :watchlist_show

json.favorites user.favorite_shows, partial: 'api/tv/watchlist_show', 
	as: :watchlist_show

json.followers user.followers, partial: "api/users/follow", as: :user
json.idols user.idols, partial: "api/users/follow", as: :user

json.posts user.posts, partial: 'api/posts/post', as: :post