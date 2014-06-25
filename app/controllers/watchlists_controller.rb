class WatchlistsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @watchlist = @user.watchlist_shows.where(watchlists: {
      status: "Currently Watching"
    })
  end
  
  def create
    @tv = TvShow.find(params[:tv_id])
    @watchlist = current_user.watchlists.new(watchlist_params)
    @watchlist.tv_show = @tv
    
    if @watchlist.save
      redirect_to user_watchlist_url(current_user)
    else
      flash[:errors] = ["You've already added this series to your watchlist!"]
      redirect_to @tv
    end
  end
  
  def update
    @watchlist = Watchlist.find(params[:id])
    
    unless @watchlist.update_attributes(watchlist_params)
      flash[:errors] = @watchlist.errors.full_messages
    end
    
    redirect_to user_watchlist_url(current_user)
  end
  
  private
  def watchlist_params
    params.require(:watchlist).permit(:status)
  end
end
