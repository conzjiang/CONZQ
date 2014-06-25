class Decade < ActiveRecord::Base
  validates :years, presence: true, uniqueness: true
  
  has_many :tv_decades
  has_many :tv_shows, through: :tv_decades
end
