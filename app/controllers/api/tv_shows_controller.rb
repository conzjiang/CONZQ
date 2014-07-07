class Api::TvShowsController < ApplicationController
  def index
    @tvs = TvShow.all
 
    render 'api/tv/index'
  end
  
  def show
    tv = TvShow.find(params[:id])
    
    render partial: 'api/tv/tv_result', locals: { tv_show: tv }
  end
  
  def front_page
    @tvs = TvShow.where(status: "Currently Airing")
    
    render 'api/tv/front'
  end
  
  def rest_genres
    @genres = Genre.where(top_level: false).order(:name)
    
    render "api/tv/genres"
  end
  
  private
  def tv_params
    params.require(:tv).permit(:title, :photo, :seasons, :year_start,
                               :year_end, :status, :blurb, :network)
  end

  def check_admin
    unless signed_in? && current_user.admin
      render json: "You are not allowed to perform this action!"
    end
  end
end
