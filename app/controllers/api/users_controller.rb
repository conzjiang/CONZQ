class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    
    render partial: "api/users/user", locals: { user: @user }
  end
  
  def update
    @user = User.find(params[:id])
    
    if params[:favorite]
      tv_show_id = params[:favorite][:tv_show_id]
      
      if !@user.favorites.find_by(tv_show_id: tv_show_id).try(:destroy!)
        favorite = @user.favorites.new(tv_show_id: tv_show_id)
        favorite.save!
      end
    elsif params[:idol_id]
      if !current_user.follows.find_by(idol_id: params[:idol_id]).try(:destroy!)
        follow = current_user.follows.new(idol_id: params[:idol_id])
        follow.save!
      end
    end
    
    render partial: "api/users/user", locals: { user: @user }       
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
