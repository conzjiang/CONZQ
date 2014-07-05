class Follow < ActiveRecord::Base
  validates :follower_id, uniqueness: { scope: :idol_id }
  validate :cant_follow_self

  belongs_to :follower,
    class_name: "User"

  belongs_to :idol,
    class_name: "User"
  
  private
  def cant_follow_self
    if follower_id == idol_id
      errors[:follow] << "can't follow self"
    end
  end
end
