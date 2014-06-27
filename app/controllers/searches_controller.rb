class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end

  def create
    @search_param_names = search_param_names(params[:search])
    @search_params = @search_param_names.join("+")
    @query = run_query(params[:search])

    render :show
  end

  def show

  end

  def sort
    @search_params = params[:query]
    @comparator = sort_params[:sort_by]

    @query = sort_results(@search_params, @comparator)
    @search_param_names = @search_params.split("+")

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
    query = nil

    if params[:genre_ids].nil? && params[:decade_ids]
      query = TvDecade.search(params[:decade_ids])
    elsif params[:decade_ids].nil? && params[:genre_ids]
      query = TvGenre.search(params[:genre_ids])
    elsif params[:genre_ids] && params[:decade_ids]
      query = TvGenre.search(params[:genre_ids]) &
              TvDecade.search(params[:decade_ids])
    end

    if params[:status]
      if query
        if query.is_a?(Array)
          query.select! { |show| show.status == params[:status] }
        else
          query = query.where(status: params[:status])
        end
      else
        query = TvShow.where(status: params[:status])
      end
    end

    query
  end

  def search_param_names(params)
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

  def sort_results(query, comparator)
    params = parse_query_into_params(query)
    results = run_query(params)

    results.is_a?(Array) ?
      sort_array(results, comparator) : sort_arel(results, comparator)
  end

  def parse_query_into_params(query)
    params = {}
    query = query.split("+")

    current = nil
    current = query.shift if query.first == "Currently Airing"

    decade_ids = []
    until query.empty?
      begin
        year = Integer(query.first)
        query.shift

        decade = Decade.find_by(years: year)
        decade_ids << decade.id if decade
      rescue
        break
      end
    end

    genre_ids = []
    query.each do |genre|
      genre_exists = Genre.find_by(name: genre)
      genre_ids << genre_exists.id if genre_exists
    end

    params[:status] = current
    params[:decade_ids] = decade_ids unless decade_ids.empty?
    params[:genre_ids] = genre_ids unless genre_ids.empty?

    params
  end

  def sort_array(results_arr, comparator)
    case comparator
    when "A-Z"
      results_arr.sort_by! { |show| show.title }
    when "Z-A"
      results_arr.sort_by! { |show| show.title }.reverse!
    when "Highest Rating"
      results_arr.sort_by! { |show| show.rating }.reverse!
    when "Lowest Rating"
      results_arr.sort_by! { |show| show.rating }
    end

    results_arr
  end

  def sort_arel(arel_results, comparator)
    case comparator
    when "A-Z"
      arel_results = arel_results.order(:title)
    when "Z-A"
      arel_results = arel_results.order(:title).reverse
    when "Highest Rating"
      arel_results = arel_results.order(:rating).reverse
    when "Lowest Rating"
      arel_results = arel_results.order(:rating)
    end

    arel_results
  end
end
