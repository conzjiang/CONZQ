class TvDecade < ActiveRecord::Base
  belongs_to :tv_show
  belongs_to :decade
  
  def self.search(decade_ids)
    if @tvs.nil?
      all_shows = []
      
      decade_ids.each do |id|
        all_shows << TvShow.joins(:tv_decades).where(tv_decades: { decade_id: id })
      end

      @tvs = all_shows[0]
      switched = false
      
      all_shows.each_index do |index|
        next if index == 0
        common_shows = @tvs & all_shows[index]

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
