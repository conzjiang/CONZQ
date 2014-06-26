class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  private
  def run_query(params)
    query = nil

    if params[:genre_ids].nil? && params[:decade_ids]
      query = TvDecade.search(params[:decade_ids])
    elsif params[:decade_ids].nil? && params[:genre_ids]
      query = TvGenre.search(params[:genre_ids])
    elsif params[:genre_ids] && params[:decade_ids]
      query = TvGenre.search(params[:genre_ids]) &
              TvDecade.search(params[:decade_ids])
    end

    if params[:status]
      if query
        if query.is_a?(Array)
          query.select! { |show| show.status == params[:status] }
        else
          query = @query.where(status: params[:status])
        end
      else
        query = TvShow.where(status: params[:status])
      end
    end

    query
  end

  def search_param_names(params)
    search = []

    if params[:decade_ids].nil? && params[:genre_ids]
      search = Genre.where(id: params[:genre_ids]).pluck(:name)
    elsif params[:genre_ids].nil? && params[:decade_ids]
      search = Decade.where(id: params[:decade_ids]).pluck(:years)
    elsif params[:genre_ids] && params[:decade_ids]
      search = Decade.where(id: params[:decade_ids]).pluck(:years) +
               Genre.where(id: params[:genre_ids]).pluck(:name)
    end

    search.unshift(params[:status]) if params[:status]

    search
  end

  def signed_in?
    !!current_user
  end

  def login!(user)
    session[:token] = user.reset_token!
    @current_user = user
  end

  def logout!
    current_user.reset_token!
    session[:token] = nil
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def require_signed_in
    unless signed_in?
      flash[:errors] = ["You must be signed in to perform that action!"]
      redirect_to new_session_url
    end
  end
end
