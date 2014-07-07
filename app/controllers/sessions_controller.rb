class SessionsController < ApplicationController
  before_action :already_signed_in, only: [:new, :create]
  
  def root
    
  end

  def new
    
  end

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login!(@user)
      redirect_to '/#/users/' + @user.id.to_s
    else
      flash.now[:errors] = ["Incorrect username/password combination"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end
  
  private
  def already_signed_in
    if signed_in?
      flash[:errors] = ["You are already signed in!"]
      redirect_to root_url
    end
  end
end
