class OauthCallbacksController < ApplicationController
  def facebook
    user = User.find_or_create_by_fb_auth_hash(request.env['omniauth.auth'])
    login!(user)
    redirect_to root_url
  end
end