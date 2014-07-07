class Comment < ActiveRecord::Base
  validates :body, presence: true
  
  belongs_to :post
  belongs_to :commenter, class_name: "User", foreign_key: :commenter_id
end
