class PostsController < ApplicationController
  before_filter :require_signed_in

  def create
    tv = TvShow.find(params[:tv_show_id])
    @post = tv.posts.new(post_params.merge(user_id: current_user.id))

    unless @post.save
      flash[:errors] = @post.errors.full_messages
    end

    redirect_to tv
  end

  private
  def post_params
    params.require(:post).permit(:body)
  end
end
