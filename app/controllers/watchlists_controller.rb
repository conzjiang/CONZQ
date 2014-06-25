class WatchlistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @watchlist = @user.watchlists.where(status: "Currently Watching")
  end
end
