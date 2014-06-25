class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end
  
  def create
    @search_params = search_params

    if params[:genre_ids].nil? && params[:decade_ids]
      @query = TvDecade.search(params[:decade_ids])
    elsif params[:decade_ids].nil? && params[:genre_ids]
      @query = TvGenre.search(params[:genre_ids])
    elsif params[:genre_ids] && params[:decade_ids]
      @query = TvGenre.search(params[:genre_ids]) & 
               TvDecade.search(params[:decade_ids])
    end
    
    if params[:status]
      if @query
        if @query.is_a?(Array)
          @query.select! { |show| show.status == params[:status] }
        else
          @query = @query.where(status: params[:status])
        end
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
    
    if params[:decade_ids].nil? && params[:genre_ids]
      search = Genre.where(id: params[:genre_ids]).pluck(:name)
    elsif params[:genre_ids].nil? && params[:decade_ids]
      search = Decade.where(id: params[:decade_ids]).pluck(:years)
    elsif params[:genre_ids] && params[:decade_ids]
      search = Decade.where(id: params[:decade_ids]).pluck(:years) + 
               Genre.where(id: params[:genre_ids]).pluck(:name)
    end
    
    search.unshift(params[:status]) if params[:status]
    
    search
  end
end
