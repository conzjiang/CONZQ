class TvGenre < ActiveRecord::Base
  belongs_to :tv_show
  belongs_to :genre
  
  def self.search(genre_ids)
    if @tvs.nil?
      all_shows = []
      
      genre_ids.each do |id|
        all_shows << TvShow.joins(:tv_genres).where(tv_genres: { genre_id: id })
      end
      
      @tvs = all_shows[0]
      all_shows[1..-1].each_index do |i|
        common_shows = @tvs & all_shows[i]
        @tvs = common_shows if common_shows.length > 0
      end
    end
    
    @tvs
  end
end
