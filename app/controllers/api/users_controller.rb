class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to @user
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])

    render json: @user, include: [:watchlist_shows, :favorite_shows]
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
