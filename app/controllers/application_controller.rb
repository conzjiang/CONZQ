class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  private
  def login!(user)
    session[:token] = user.reset_token!
    @current_user = user
  end
end
