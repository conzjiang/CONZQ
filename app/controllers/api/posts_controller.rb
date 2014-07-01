class Api::PostsController < ApplicationController
  before_action :check_user, only: :create
  
  def create
    @post = current_user.posts.new(post_params)
    
    if @post.save
      render json: @post
    else
      render json: { errors: @post.errors.full_messages }, 
             status: :unprocessable_entity
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
  
  def check_user
    if current_user.id != params[:user_id].to_i
      render json: { errors: "Nacho cheese" },
             status: :unprocessable_entity
    end
  end
end