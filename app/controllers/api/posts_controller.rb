class Api::PostsController < ApplicationController
  before_action :check_user, only: [:destroy]
  
  def show
    @post = Post.find(params[:id])
    
    render partial: 'api/posts/post', locals: { post: @post }
  end
  
  def create
    @post = Post.new(post_params.merge({ user_id: current_user.id }))
    
    if @post.save
      render partial: 'api/posts/post', locals: { post: @post }
    else
      render json: { errors: @post.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end
  
  def update
    if params[:comment]
      destroyed_comment = Comment.find_by(id: params[:comment][:id])
                                 .try(:destroy!)
      
      if destroyed_comment
        render partial: 'api/comments/comment', locals: { 
          comment: destroyed_comment
        }
      else
        post = Post.find(params[:id])
        
        comment = post.comments.new(comment_params.merge({
          commenter_id: current_user.id
        }))
      
        if comment.save
          render partial: 'api/comments/comment', locals: { comment: comment }
        else
          render json: { errors: post.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end
    end
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
    render json: @post
  end
  
  private
  def post_params
    params.require(:post).permit(:tv_show_id, :body)
  end
  
  def comment_params
    params.require(:comment).permit(:body)
  end
  
  def check_user
    post = Post.find(params[:id])
    
    if current_user.id != post.user_id
      render json: { errors: "Nacho cheese" },
             status: :unprocessable_entity
    end
  end
end