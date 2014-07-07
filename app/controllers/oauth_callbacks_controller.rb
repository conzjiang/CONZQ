class OauthCallbacksController < ApplicationController
  def facebook
    auth_hash = request.env['omniauth.auth']
    user = User.find_by(uid: auth_hash[:uid], provider: auth_hash[:provider])
    
    if user
      login!(user)
      redirect_to '/#/users/' + user.id.to_s
    else
      username = auth_hash[:info][:email].split("@").first
      
      if User.find_by(username: username)
        username = username + SecureRandom::urlsafe_base64(2)
      end
      
      @user = User.create!(
        uid: auth_hash[:uid],
        provider: auth_hash[:provider],
        username: username,
        email: auth_hash[:info][:email],
        password_digest: SecureRandom::urlsafe_base64(16)
      )
      
      redirect_to update_username_url(@user)
    end
  end
end