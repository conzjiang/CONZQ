class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    
    render partial: "api/users/user", locals: { user: @user }
  end
  
  def update
    @user = User.find(params[:id])
    
    if params[:favorite]
      tv_show_id = params[:favorite][:tv_show_id]
      favorite = @user.favorites.find_by(tv_show_id: tv_show_id)
      
      if !favorite.try(:destroy!)
        favorite = @user.favorites.new(tv_show_id: tv_show_id)
        favorite.save!
      end
      
      render json: @user
      
    elsif params[:idol_id]
      follow = current_user.follows.find_by(idol_id: params[:idol_id])
      
      if !follow.try(:destroy!)
        follow = current_user.follows.new(idol_id: params[:idol_id])
        follow.save!
      end
      
      render json: @user
      
    else
      @user.update_attributes(user_params)
      
      render partial: "api/users/user", locals: { user: @user } 
    end      
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :photo, :bio)
  end
end
