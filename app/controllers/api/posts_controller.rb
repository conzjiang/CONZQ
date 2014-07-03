class Api::PostsController < ApplicationController
  before_action :check_user, only: [:create, :destroy]
  
  def show
    @post = Post.find(params[:id])
    
    render partial: 'api/posts/post', locals: { post: @post }
  end
  
  def create
    @post = Post.new(post_params.merge({ user_id: current_user.id }))
    
    if @post.save
      render json: @post
    else
      render json: { errors: @post.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end
  
  def update
    @post = Post.find(params[:id])
    
    if params[:comment]
      @comment = @post.comments.new(comment_params.merge({
        commenter_id: current_user.id
      }))
      
      render json: @comment if @comment.save
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
    if current_user.id != params[:user_id].to_i
      render json: { errors: "Nacho cheese" },
             status: :unprocessable_entity
    end
  end
end