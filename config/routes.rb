CONZQ::Application.routes.draw do
  resources :users
  resource :session
  
  resources :tv_shows
  
  root to: "users#new"
end
