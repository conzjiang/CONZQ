class Api::WatchlistsController < ApplicationController
  def create
    @watchlist = current_user.watchlists.new(watchlist_params)
    
    if @watchlist.save
      render json: @watchlist
    else
      render json: { errors: @watchlist.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end
  
  def update
    @watchlist = Watchlist.find(params[:id])
    
    if @watchlist.update_attributes(watchlist_params)
      render json: @watchlist
    else
      render json: { errors: @watchlist.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end
  
  def destroy
    
  end
  
  private
  def watchlist_params
    params.require(:watchlist).permit(:tv_show_id, :status)
  end
end