require 'addressable/uri'

class TvShow < ActiveRecord::Base
  STATUSES = ["Currently Airing", "Ended", "Cancelled"]
  NETWORKS = ["ABC", "CBS", "NBC", "FOX", "AMC", "Nickelodeon", "Netflix",
              "A&E", "History", "MTV", "WeTV", "USA", "TNT", "TBS", "IFC",
              "Comedy Central", "BBC America", "PBS", "HBO", "Showtime",
              "Starz", "CW", "FX", "FXX", "Sundance"].sort
  
  validates :title, presence: true
  validates :status, inclusion: { in: STATUSES }
  
  has_many :tv_genres
  has_many :genres, through: :tv_genres
  belongs_to :admin,
    class_name: "User",
    foreign_key: :admin_id,
    inverse_of: :tv_shows
    
  def apply_imdb_rating
    self.rating = parse_omdb["imdbRating"]
  end
  
  def auto_complete
    omdb_info = parse_omdb
    tmdb_info = parse_tmdb
    
    self.blurb = omdb_info["Plot"]
    
    years = omdb_info["Year"].split("-")
    self.year_start = years.first
    
    if years.count > 1
      self.year_end = years.last
      self.status = "Currently Airing"
    end
    
    self.seasons = tmdb_info["number_of_seasons"]
    
    @genre_names = omdb_info["Genre"].split(",")
    nil
  end
  
  def genre_names
    @genre_names ||= self.genres.pluck(:name)
  end
  
  private
  def parse_omdb
    show = Addressable::URI.new(
          scheme: "http",
          host: "www.omdbapi.com",
          path: "",
          query_values: {
            t: self.title
          }).to_s
    
    JSON.parse(RestClient.get(show))
  end
  
  def parse_tmdb
    parsed_omdb = parse_omdb
    
    api_key = File.read(".tmdb_api_key")
    
    tmdb_external_search = Addressable::URI.new(
          scheme: "http",
          host: "api.themoviedb.org",
          path: "3/find/" + parse_omdb["imdbID"],
          query_values: {
            api_key: api_key,
            external_source: "imdb_id"
          }).to_s
          
    parsed_tmdb = JSON.parse(RestClient.get(tmdb_external_search))
    tmdb_show_id = parsed_tmdb["tv_results"].first["id"].to_s
    
    tmdb_show_info = Addressable::URI.new(
          scheme: "http",
          host: "api.themoviedb.org",
          path: "3/tv/" + tmdb_show_id,
          query_values: {
            api_key: api_key
          }).to_s
    
    JSON.parse(RestClient.get(tmdb_show_info))
  end
end
