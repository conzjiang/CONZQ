class Api::SearchesController < ApplicationController
  def categories
    @decades = {}
    Decade.all.each do |decade|
      @decades[decade.id] = decade.years == 0 ? "00" : decade.years.to_s
    end

    @genres = {}
    Genre.most_popular.each do |genre|
      @genres[genre.id] = genre.name
    end

    render json: { decades: @decades, genres: @genres }
  end

  def show
    @results = run_query(params[:search])

    unless @results.empty?
      render partial: 'api/searches/search', locals: {
        search: params,
        results: @results
      }
    else
      render json: { results: "No results!" }
    end
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

    render partial: 'api/searches/text_results', locals: {
      search: {},
      tv_results: @tv_results,
      user_results: @user_results
    }
  end

  private
  def run_query(params)
    decade_ids = params[:decade_ids]
    genre_ids = params[:genre_ids]
    current = params[:status]

    if decade_ids
      decade_where = "tv_decades.decade_id IN (#{decade_ids.join(", ")})"
    else
      decade_where = ""
    end

    if genre_ids
      genre_where = "tv_genres.genre_ud IN (#{genre_ids.join(", ")})"
    else
      genre_where = ""
    end

    if current
      current_where = "tv_shows.status LIKE 'Current%'"
    else
      current_where = ""
    end

    TvShow.joins(:tv_decades)
      .joins(:tv_genres)
      .where(decade_where).where(genre_where).where(current_where)
  end
end
