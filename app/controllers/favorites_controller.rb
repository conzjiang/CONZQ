class FavoritesController < ApplicationController
  before_action :require_signed_in, only: [:create, :destroy]

  def index
    @user = User.find(params[:user_id])
    @favorites = @user.favorite_shows
  end

  def create
    @favorite = Favorite.new(tv_show_id: params[:tv_id])
    @favorite.user = current_user

    @favorite.save!

    redirect_to :back
  end

  def destroy
    @favorite = current_user.favorites.find_by(tv_show_id: params[:tv_id])
    @favorite.destroy!

    redirect_to :back
  end
end
