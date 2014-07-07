class SearchesController < ApplicationController
  def new
    @front_page_shows = TvShow.where(status: "Currently Airing")
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
    @query = params[:query]
    
    results = PgSearch.multisearch(@query).includes(:searchable)
    @tv_results = []
    @user_results = []
    
    results.map(&:searchable).each do |result|
      if result.is_a?(TvShow)
        @tv_results << result
      else
        @user_results << result
      end
    end
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
