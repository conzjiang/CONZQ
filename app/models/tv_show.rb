class TvShow < ActiveRecord::Base
  STATUSES = ["Currently Airing", "Ended", "Cancelled"]
  
  validates :title, presence: true
  validates :status, inclusion: { in: STATUSES }

end
