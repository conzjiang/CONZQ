CONZQ::Application.routes.draw do
  resources :users
  resource :session
  
  # get 'users/new' => 'users#new', :as => 'register'
  
  get "tv/new", to: "tv_shows#new"
  post "tv", to: "tv_shows#create"
  get "tv/:id/edit", to: "tv_shows#edit", as: "edit_tv"

  
  root to: "users#new"
end
