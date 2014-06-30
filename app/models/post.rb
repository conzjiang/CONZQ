class Post < ActiveRecord::Base
  validates :user, :body, presence: true
  
  belongs_to :user
  belongs_to :tv_show
end
