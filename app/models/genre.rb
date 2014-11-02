class Genre < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :tv_genres
  has_many :tv_shows, through: :tv_genres

  def self.most_popular
    Genre.select("genres.*, COUNT(tv_genres.genre_id) AS count")
      .joins(:tv_genres)
      .group("genres.id")
      .order("count DESC")
      .limit(9)
  end
end
