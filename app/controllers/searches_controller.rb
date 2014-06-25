class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end
  
  def create
    @search_params = search_params

    if params[:genre_ids].nil?
      @query = TvDecade.search(params[:decade_ids])
    elsif params[:decade_ids].nil?
      @query = TvGenre.search(params[:genre_ids])
    elsif params[:genre_ids] && params[:decade_ids]
      @query = TvGenre.search(params[:genre_ids]) & 
               TvDecade.search(params[:decade_ids])
    end
    
    if params[:status]
      if @query
        @query = @query.where(status: params[:status])
      else
        @query = TvShow.where(status: params[:status])
      end
    end
    
    render :show
  end
  
  def show
    
  end
  
  private
  def search_params
    search = []
    
    if params[:genre_ids].nil?
      search = Genre.where(id: params[:genre_ids]).pluck(:name)
    elsif params[:decade_ids].nil?
      search = Decade.where(id: params[:decade_ids]).pluck(:years)
    elsif params[:genre_ids] && params[:decade_ids]
      search = Decade.where(id: params[:decade_ids]).pluck(:years) + 
               Genre.where(id: params[:genre_ids]).pluck(:name)
    end
    
    search.unshift(params[:status]) if params[:status]
    
    search
  end
end
