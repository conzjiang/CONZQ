class TvDecade < ActiveRecord::Base
  DECADES = {
    1 => 50,
    2 => 60,
    3 => 70,
    4 => 80,
    5 => 90,
    6 => 00,
    7 => 10
  }

  DECADE_IDS = DECADES.invert

  belongs_to :tv_show
  belongs_to :decade

  def self.years(decade_ids)
    return [] if decade_ids.nil? || decade_ids.empty?

    DECADES.select { |id, year| decade_ids.map(&:to_i).include?(id) }.values
  end

  def self.search(decade_ids)
    return if decade_ids.nil? || decade_ids.empty?

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
