class TvDecade < ActiveRecord::Base
  belongs_to :tv_show
  belongs_to :decade
end
