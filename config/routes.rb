CONZQ::Application.routes.draw do
  root to: "sessions#root" # BACKBONE
  
  # --------------------------------------------------
  # BACKBONE
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :update] do
      resources :watchlists, only: [:create, :update, :destroy]
    end
    
    resources :posts, only: [:create, :show, :update, :destroy] do
      resources :comments, only: [:show]
    end
    
    resources :tv_shows, only: [:index, :show]
    resource :search, only: [:show]
    
    get '/front', to: "tv_shows#front_page", as: "front_page"
    get '/search/input_search', to: "searches#text_search", as: "text_search"
    get '/search/categories', to: "searches#categories", as: "categories"
    get '/rest_genres', to: "tv_shows#rest_genres", as: "rest_genres"
  end



  # --------------------------------------------------
  # RAILS

  resources :users
  resource :session
  resource :search, only: [:new]
  
  # FACEBOOK LOGIN
  get '/auth/facebook/callback', to: 'oauth_callbacks#facebook'
  get '/users/:id/username', to: 'users#update_username', as: 'update_username'

  # SEARCH ROUTES
  # get "/search", to: "searches#show", as: "search_query"
  # post "/search/:search_params/sort", to: "searches#sort", as: "sort"
  get "/input-search", to: "searches#text_search", as: "text_search"

  # TV SHOW ROUTES
  get "/tv/index", to: "tv_shows#index", as: "tv_shows"
  get "/tv/new", to: "tv_shows#new", as: "new_tv"
  post "/tv", to: "tv_shows#create"
  get "/tv/:id", to: "tv_shows#show", as: "tv_show"
  get "/tv/:id/edit", to: "tv_shows#edit", as: "edit_tv"
  put "/tv/:id", to: "tv_shows#update", as: "update_tv"

  # AUTOCOMPLETE ROUTE
  post "/tv/new/auto", to: "tv_shows#auto_complete_form", as: "auto_complete"

  # WATCHLIST ROUTES
  # post "/tv/:tv_id/watchlist", to: "watchlists#create", as: "tv_watchlist"
  # put "/watchlist/:id", to: "watchlists#update", as: "update_watchlist"

  # FAVORITE ROUTES
  # post "/tv/:tv_id/favorite", to: "favorites#create", as: "add_fav"
  # delete "/tv/:tv_id/favorite", to: "favorites#destroy", as: "delete_fav"

  # UNFOLLOW ROUTE
  # delete "/user/:user_id/unfollow", to: "follows#destroy", as: "unfollow"
end
