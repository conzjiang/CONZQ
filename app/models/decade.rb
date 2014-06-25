class Decade < ActiveRecord::Base
  validates :years, presence: true, uniqueness: true
  
  has_many :tv_decades
  has_many :tv_shows, through: :tv_decades
  
  def self.parse(year)
    year.to_s[-2].to_i * 10
  end
end
