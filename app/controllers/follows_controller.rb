class FollowsController < ApplicationController
  before_action :require_signed_in

  def index

  end

  def create
    @user = User.find(params[:user_id])
    @follow = current_user.follows.new(idol_id: @user.id)
    @follow.save!

    redirect_to @user
  end

  def destroy
    @user = User.find(params[:user_id])
    @follow = current_user.follows.find_by(idol_id: @user.id)
    @follow.destroy!

    redirect_to @user
  end
end
