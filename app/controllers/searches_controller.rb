class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end

  def create
    @query = run_query(params[:search])
    @search_params = @search_param_names.join("+")

    session[:result_ids] =
      @query.is_a?(Array) ? @query.map { |show| show.id } : @query.pluck(:id)

    redirect_to search_query_url(@search_params)
  end

  def show
    @search_params = params[:search_params]
    @query = TvShow.find(session[:result_ids])
  end

  def sort
    @search_params = params[:query]
    @comparator = sort_params[:sort_by]
    @query = sort_results(@comparator)

    render :show
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
    decade_ids = params[:decade_ids]
    genre_ids = params[:genre_ids]
    currently_airing = params[:status]

    decade_results = TvDecade.search(decade_ids)
    genre_results = TvGenre.search(genre_ids)
    results = [decade_results, genre_results]

    results = results.include?(nil) ? results.flatten.compact :
                                      decade_results & genre_results

    @search_param_names = TvDecade.years(decade_ids) + TvGenre.names(genre_ids)

    if currently_airing
      unless results.empty?
        results.select! { |show| show.status == currently_airing }
      else
        results = TvShow.where(status: currently_airing)
      end

      @search_param_names.unshift(currently_airing)
    end

    results
  end

  def sort_results(comparator)
    tvs = TvShow.find(session[:result_ids])

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
