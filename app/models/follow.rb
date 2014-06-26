class Follow < ActiveRecord::Base
  validates :follower_id, uniqueness: { scope: :idol_id }

  belongs_to :follower,
    class_name: "User"

  belongs_to :idol,
    class_name: "User"
end
