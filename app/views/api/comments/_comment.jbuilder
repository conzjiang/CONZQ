json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at, :updated_at

json.commenter comment.commenter, :id, :username