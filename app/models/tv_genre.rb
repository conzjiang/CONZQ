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
