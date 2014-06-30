class SearchesController < ApplicationController
  def new
    @decades = TvDecade::DECADES
    @genres = TvGenre::GENRES.sort_by { |id, genre| genre }
  end

  def show
    session[:result_ids] = run_query(params[:search])
    @search_params = @search_param_names.join("+")
    @query = TvShow.includes(:genres).find(session[:result_ids])
  end

  def sort
    @search_params = params[:search_params]
    @comparator = sort_params[:sort_by]
    @query = sort_results(@comparator)

    render :show
  end
  
  def text_search
    if !params[:query].blank?
      @query = params[:query]
      session[:last_search] = params[:query]
    else
      @query = session[:last_search]
    end
    
    @results = PgSearch.multisearch(@query).includes(:searchable)
  end

  private
  def search_params
    params.require(:search).permit(:genre_ids, :decade_ids, :status)
  end

  def sort_params
    params.require(:comparator).permit(:sort_by)
  end

  def run_query(params)
    @search_param_names = []
    decade_ids = params["decade_ids"]
    genre_ids = params["genre_ids"]
    currently_airing = params["status"]

    decade_results = TvDecade.search(decade_ids)
    genre_results = TvGenre.search(genre_ids)
    results = [decade_results, genre_results]
    
    results = 
      results.include?(nil) ? results.flatten.compact :
                              decade_results & genre_results              
                              
    @search_param_names = TvDecade.years(decade_ids) + TvGenre.names(genre_ids)
  
    if currently_airing
      unless results.empty?
        results.select! { |show| show.status == currently_airing }.map!(&:id)
      else
        results = TvShow.where(status: currently_airing).pluck(:id)
      end

      @search_param_names.unshift(currently_airing)
    else
      results.map!(&:id)
    end

    results
  end

  def sort_results(comparator)
    tvs = TvShow.includes(:genres).find(session[:result_ids])

    case comparator
    when "A-Z"
      tvs.sort_by! { |show| show.title }
    when "Z-A"
      tvs.sort_by! { |show| show.title }.reverse!
    when "Highest Rating"
      tvs.sort_by! { |show| show.rating }.reverse!
    when "Lowest Rating"
      tvs.sort_by! { |show| show.rating }
    end
  end
end
