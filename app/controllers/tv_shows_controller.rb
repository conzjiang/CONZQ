class TvShowsController < ApplicationController
  before_action :check_admin, only: [:new, :create]
  
  def new
    @tv = TvShow.new
    @genres = Genre.all.order(:name)
  end
  
  def create
    @tv = TvShow.new(tv_params)
    @tv.admin = current_user
    @tv.tv_genre_ids = params[:tv_genre_ids]
    
    if @tv.save
      redirect_to @tv
    else
      flash.now[:errors] = @tv.errors.full_messages
      render :new
    end
  end
  
  def show
    @tv = TvShow.find(params[:id])
  end
  
  private
  def tv_params
    params.require(:tv).permit(:title, :photo, :seasons, :year_start, 
                               :year_end, :status, :blurb)
  end
  
  def check_admin
    unless signed_in? && current_user.admin
      flash[:errors] = ["You are not allowed to perform that action!"]
      redirect_to root_url
    end
  end
end
