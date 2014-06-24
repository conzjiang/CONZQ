class TvShowsController < ApplicationController
  def new
    @tv = TvShow.new
    @genres = ["Reality", "Comedy", "Drama", "Action", "Crime", "Sci-Fi",
               "Thriller", "Animated", "Period", "Procedural", "Serialized",
               "Scripted"].sort
  end
  
  def create
    @tv = TvShow.new(tv_params)
    
    
  end
  
  private
  def tv_params
    params.require(:tv).permit(:title, :photo, :seasons, :year_start, 
                               :year_end, :status, :blurb)
  end
end
