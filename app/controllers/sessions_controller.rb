class SessionsController < ApplicationController
  def new
    
  end
  
  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login!(@user)
      redirect_to @user
    else
      flash.now[:errors] = ["Incorrect username/password combination"]
      render :new
    end
  end
  
  def destroy
    logout!
    redirect_to root_url
  end
end
