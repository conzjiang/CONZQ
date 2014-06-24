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
    pulled_info = parse_omdb
    
    self.blurb = pulled_info["Plot"]
    
    years = pulled_info["Year"].split("-")
    self.year_start = years.first
    
    if years.count > 1
      self.year_end = years.last
      self.status = "Currently Airing"
    end
    
    self.genres = pulled_info["Genre"].split(",")
    nil
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
end
