class TvGenre < ActiveRecord::Base
  GENRES = {
    1 => "Action",
    2 => "Animated",
    3 => "Comedy",
    4 => "Crime",
    5 => "Drama",
    6 => "Live-Action",
    7 => "Period",
    8 => "Procedural",
    9 => "Sci-Fi/Fantasy",
    10 => "Scripted",
    11 => "Serialized",
    12 => "Thriller",
    13 => "Unscripted/Reality",
    14 => "Western",
    15 => "Single-camera",
    16 => "Multi-camera"
  }

  GENRE_IDS = GENRES.invert

  belongs_to :tv_show
  belongs_to :genre

  def self.names(genre_ids)
    return [] if genre_ids.nil? || genre_ids.empty?

    GENRES.select { |id, genre| genre_ids.map(&:to_i).include?(id) }.values
  end

  def self.search(genre_ids)
    return if genre_ids.nil? || genre_ids.empty?

    if @tvs.nil?
      all_shows = []

      genre_ids.each do |id|
        all_shows << 
          TvShow.joins(:tv_genres).where(tv_genres: { genre_id: id })
      end

      @tvs = all_shows[0]
      switched = false

      all_shows.each_index do |i|
        next if i == 0
        common_shows = @tvs & all_shows[i]

        if common_shows
          @tvs = common_shows
          switched = true
        end
      end

      @tvs = [] if (switched == false && all_shows.length > 1)
    end

    @tvs
  end
end
