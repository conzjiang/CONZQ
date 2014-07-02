json.extract! post, :id, :user_id, :body, :tv_show_id, :created_at, :updated_at

json.comments post.comments, partial: 'api/comments/comment', as: :comment