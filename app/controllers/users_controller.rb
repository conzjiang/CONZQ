class UsersController < ApplicationController
  before_action :check_user, only: [:edit, :update]
  
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

  def show
    @user = User.find(params[:id])
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    
    unless @user.update_attributes(user_params)
      flash[:error] = @user.errors.full_messages
    end
    
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :photo, :bio)
  end
  
  def check_user
    if current_user != User.find(params[:id])
      flash[:error] = ["You are not allowed to perform that action!"]
      redirect_to root_url
    end
  end
end
