CONZQ::Application.routes.draw do
  resources :users
  resource :session
  
  # TV SHOW ROUTES
  get "tv/new", to: "tv_shows#new", as: "new_tv"
  post "tv", to: "tv_shows#create"
  get "tv/:id", to: "tv_shows#show", as: "tv_show"
  get "tv/:id/edit", to: "tv_shows#edit", as: "edit_tv"
  put "tv/:id", to: "tv_shows#update", as: "update_tv"
  
  # AUTOCOMPLETE ROUTE
  post "tv/new/auto", to: "tv_shows#auto_complete_form", as: "auto_complete"
  
  root to: "users#new"
end
