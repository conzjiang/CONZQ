class Genre < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  
  has_many :tv_genres
  has_many :tv_shows, through: :tv_genres
end
