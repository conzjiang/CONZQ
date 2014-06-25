class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end
  
  def create
    @query = 
      TvGenre.search(params[:genre_ids]) & TvDecade.search(params[:decade_ids])
    
    if params[:status]
      @query.select! { |show| show.status == "Currently Airing" }
    end
    
    render :show
  end
  
  def show
    
  end
end
