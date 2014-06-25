class FavoritesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @favorites = @user.favorite_shows
  end
end
