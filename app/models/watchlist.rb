class Watchlist < ActiveRecord::Base
  validates :status, presence: true, inclusion: { 
    in: ["Currently Watching", "Plan to Watch", "Completed", "Dropped"]
  }
  
  belongs_to :user
  belongs_to :tv_show
end
