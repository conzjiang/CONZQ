CONZQ::Application.routes.draw do
  resources :users do
    resources :watchlists, only: [:index]
    resources :favorites, only: [:index]
  end
  
  resource :session
  resource :search, only: [:new, :create]
  
  # TV SHOW ROUTES
  get "tv/index", to: "tv_shows#index", as: "tv_shows"
  get "tv/new", to: "tv_shows#new", as: "new_tv"
  post "tv", to: "tv_shows#create"
  get "tv/:id", to: "tv_shows#show", as: "tv_show"
  get "tv/:id/edit", to: "tv_shows#edit", as: "edit_tv"
  put "tv/:id", to: "tv_shows#update", as: "update_tv"
  
  # WATCHLIST ROUTES
  post "tv/:tv_id/watchlist", to: "watchlists#create", as: "tv_watchlist"
  put "watchlist/:id", to: "watchlists#update", as: "update_watchlist"
  
  # FAVORITE ROUTES
  post "tv/:tv_id/favorite", to: "favorites#create", as: "add_fav"
  delete "tv/:tv_id/favorite", to: "favorites#destroy", as: "delete_fav"
  
  # AUTOCOMPLETE ROUTE
  post "tv/new/auto", to: "tv_shows#auto_complete_form", as: "auto_complete"
  
  root to: "searches#new"
end
