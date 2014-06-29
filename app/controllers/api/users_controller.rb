class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    user = JSON.parse(@user.to_json)
    user[:watchlist_statuses] = @user.watchlist_statuses
    
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
    end
    
    render partial: "api/users/user", locals: { user: @user }       
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
