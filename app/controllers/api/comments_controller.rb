class Api::CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(comment_params.merge({
      commenter_id: current_user.id
    }))
    
    if @comment.save
      render partial: 'api/comments/comment', locals: { comment: @comment }
    else
      render json: { error: @comment.errors.full_messages },
             status: :unprocessable_entity
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end