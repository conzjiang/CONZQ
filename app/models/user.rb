class User < ActiveRecord::Base
  validates :username, :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :watchlists
  has_many :watchlist_shows, through: :watchlists, source: :tv_show

  has_many :favorites
  has_many :favorite_shows, through: :favorites, source: :tv_show

  # PEOPLE THEY FOLLOW
  has_many :follows, foreign_key: :follower_id
  has_many :idols, through: :follows, inverse_of: :follower

  # PEOPLE WHO FOLLOW THEM
  has_many :followings, class_name: "Follow", foreign_key: :idol_id
  has_many :followers, through: :followings, inverse_of: :idol

  has_many :tv_shows,
    foreign_key: :admin_id,
    inverse_of: :admin

  def password
    @password
  end

  def password=(pass)
    @password = pass
    self.password_digest = BCrypt::Password.create(pass)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, pass)
    user = User.find_by(username: username)
    return unless user

    user.is_password?(pass) ? user : nil
  end

  def is_password?(pass)
    BCrypt::Password.new(self.password_digest).is_password?(pass)
  end
end
