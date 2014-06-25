class WatchlistsController < ApplicationController
  before_action :require_signed_in, only: [:create, :update]
  
  def index
    @user = User.find(params[:user_id])
    @watchlist = @user.watchlist_shows
  end
  
  def create
    @tv = TvShow.find(params[:tv_id])
    @watchlist = current_user.watchlists.new(watchlist_params)
    @watchlist.tv_show = @tv
    
    unless @watchlist.save
      flash[:errors] = ["You've already added this series to your watchlist!"]
    end
    
    redirect_to :back
  end
  
  def update
    @watchlist = Watchlist.find(params[:id])
    
    unless @watchlist.update_attributes(watchlist_params)
      flash[:errors] = @watchlist.errors.full_messages
    end
    
    redirect_to :back
  end
  
  private
  def watchlist_params
    params.require(:watchlist).permit(:status)
  end
end
