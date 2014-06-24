class TvShow < ActiveRecord::Base
  validates :title, presence: true
  validates :status, inclusion: { 
    in: ["Ended", "Currently Airing", "Cancelled"] 
  }
  
  
end
