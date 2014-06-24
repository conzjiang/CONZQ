class TvGenre < ActiveRecord::Base
  belongs_to :tv_show
  belongs_to :genre
end
