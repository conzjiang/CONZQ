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
      all_shows[1..-1].each_index do |i|
        common_shows = @tvs & all_shows[i]
        @tvs = common_shows if common_shows.length > 0
      end
    end
    
    @tvs
  end
end
