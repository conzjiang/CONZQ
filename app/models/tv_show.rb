class TvShow < ActiveRecord::Base
  STATUSES = ["Currently Airing", "Ended", "Cancelled"]
  
  validates :title, presence: true
  validates :status, inclusion: { in: STATUSES }
  
  has_many :tv_genres
  has_many :genres, through: :tv_genres
  belongs_to :admin,
    class_name: "User",
    foreign_key: :admin_id,
    inverse_of: :tv_shows
end
