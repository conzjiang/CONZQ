class UsersController < ApplicationController
  before_action :check_user, only: [:update_username, :edit, :update]
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to edit_user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def update_username
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    
    if @user.update_attributes(user_params)
      if params[:update]
        redirect_to edit_user_url(@user)
      else
        redirect_to '/#/users/' + @user.id.to_s
      end
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :photo, :bio)
  end
  
  def check_user
    if current_user != User.find(params[:id])
      flash[:errors] = ["You are not allowed to perform that action!"]
      redirect_to root_url
    end
  end
end
