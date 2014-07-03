class Api::SearchesController < ApplicationController
  def show
    @results = run_query(params[:search])
    
    unless @results.empty?
      render partial: 'api/searches/search', locals: {
        search: params,
        results: @results 
      }
    else
      render "No results!"
    end
  end

  private
  def run_query(params)
    decade_ids = params[:decade_ids]
    decade_shows = nil
    
    if decade_ids
      decade_shows = []
      
      decade_ids.each do |decade_id|
        decade_shows += TvShow.joins(:tv_decades)
                              .where("tv_decades.decade_id = ?", decade_id)
      end
      
      decade_shows.uniq!
    end
    
    genre_ids = params[:genre_ids]
    genre_shows = nil
    
    if genre_ids
      genre_shows = []
      
      genre_ids.each do |genre_id|
        genre_shows += TvShow.joins(:tv_genres)
                             .where("tv_genres.genre_id = ?", genre_id)
      end
      
      genre_shows.uniq!
    end
    
    current = params[:status]
    current_shows = nil
    
    if current
      current_shows = TvShow.where(status: "Currently Airing")
    end
    
    results = [decade_shows, genre_shows, current_shows].compact
    
    final_results = results.first
    results[1..-1].each do |show_arr|
      final_results = final_results & show_arr
    end
    
    final_results
  end
end
