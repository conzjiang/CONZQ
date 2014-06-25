CONZQ::Application.routes.draw do
  resources :users
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
  get "user/:user_id/watchlist", to: "watchlists#index", as: "user_watchlist"
  post "tv/:tv_id/watchlist", to: "watchlists#create", as: "tv_watchlist"
  put "watchlist/:id", to: "watchlists#update", as: "update_watchlist"
  
  # AUTOCOMPLETE ROUTE
  post "tv/new/auto", to: "tv_shows#auto_complete_form", as: "auto_complete"
  
  root to: "users#new"
end
