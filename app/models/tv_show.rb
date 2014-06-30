# encoding: utf-8
require 'addressable/uri'

class TvShow < ActiveRecord::Base
  STATUSES = ["Currently Airing", "Ended", "Cancelled"]

  validates :title, presence: true
  validates :status, inclusion: { in: STATUSES }
  validates :imdb_id, uniqueness: true

  has_attached_file :photo, styles: {
      big: "360x360>",
      medium: "160x200#",
      thumb: "50x50#"
    }, default_url: "/images/missing_:style.jpg"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  has_many :tv_genres
  has_many :genres, through: :tv_genres

  has_many :tv_decades
  has_many :decades, through: :tv_decades

  has_many :watchlists
  has_many :watchers, through: :watchlists, source: :user

  has_many :favorites
  has_many :lovers, through: :favorites, source: :user

  belongs_to :admin,
    class_name: "User",
    foreign_key: :admin_id,
    inverse_of: :tv_shows
  
  def genre_names
    @genres ||= self.genres.pluck(:name)
  end
  
  def decade_years
    @decades ||= self.decades.pluck(:years)
  end
  
  def apply_imdb_rating
    omdb_info = parse_omdb
    self.rating = omdb_info["imdbRating"]
    self.imdb_id = omdb_info["imdbID"]
  end

  def auto_complete
    omdb_info = parse_omdb
    tmdb_info = parse_tmdb

    self.blurb = omdb_info["Plot"]

    years = omdb_info["Year"].split("–")
    self.year_start = years.first

    if years.count > 1
      self.year_end = years.last
    else
      self.status = "Currently Airing"
    end

    self.seasons = tmdb_info["number_of_seasons"]
    self.network = tmdb_info["networks"].map { |hash| hash["name"] }.join("/")

    @genre_names = omdb_info["Genre"].split(",")
    nil
  end

  def assign_decade
    start_yr = self.year_start
    return unless start_yr
    end_yr = self.year_end.nil? ? Time.now.year : self.year_end

    parsed_start = Decade.parse(start_yr)
    parsed_end = Decade.parse(end_yr)
    decades = [parsed_start, parsed_end]

    if (end_yr - start_yr > 10) && (parsed_start != parsed_end)
      year_jump = start_yr + 10

      until year_jump >= end_yr
        decades << Decade.parse(year_jump)
        year_jump += 10
      end
    end

    decade_ids = decades.uniq.map do |years|
      Decade.find_by(years: years).id if Decade.find_by(years: years)
    end

    self.decade_ids = decade_ids
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

    tmdb_external_search = Addressable::URI.new(
          scheme: "http",
          host: "api.themoviedb.org",
          path: "3/find/" + parse_omdb["imdbID"],
          query_values: {
            api_key: ENV["TMDB_KEY"],
            external_source: "imdb_id"
          }).to_s

    parsed_tmdb = JSON.parse(RestClient.get(tmdb_external_search))
    tmdb_show_id = parsed_tmdb["tv_results"].first["id"].to_s

    tmdb_show_info = Addressable::URI.new(
          scheme: "http",
          host: "api.themoviedb.org",
          path: "3/tv/" + tmdb_show_id,
          query_values: {
            api_key: ENV["TMDB_KEY"]
          }).to_s

    JSON.parse(RestClient.get(tmdb_show_info))
  end
end
