class Watchlist < ActiveRecord::Base
  STATUSES = ["Currently Watching", "Plan to Watch", "Completed", "Dropped"]
  
  validates :status, presence: true, inclusion: { in: STATUSES }
  
  belongs_to :user
  belongs_to :tv_show
end
