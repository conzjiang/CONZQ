class Api::TvShowsController < ApplicationController
  before_action :check_admin, only: [
    :index, :new, :create, :edit, :update, :destroy
  ]

  def index
    @tvs = current_user.tv_shows.order(:title)
    render json: @tvs
  end

  def new
    @tv = TvShow.new
    @genres = Genre.where(top_level: false).order(:name)
  end

  def create
    @tv = TvShow.new(tv_params)
    @tv.admin = current_user
    @tv.genre_ids = params[:genre_ids]
    @tv.apply_imdb_rating
    @tv.assign_decade

    if @tv.save
      redirect_to @tv
    else
      flash.now[:errors] = @tv.errors.full_messages
      render :new
    end
  end

  def show
    @tv = TvShow.find(params[:id])
    render json: @tv, include: [:genres, :decades]
  end

  def edit
    @tv = TvShow.find(params[:id])
    @genres = Genre.where(top_level: false).order(:name)
  end

  def update
    @tv = TvShow.find(params[:id])
    @tv.genre_ids = params[:genre_ids]

    if @tv.update_attributes(tv_params)
      redirect_to @tv
    else
      flash.now[:errors] = @tv.errors.full_messages
      render :edit
    end
  end

  def auto_complete_form
    @tv = TvShow.new(title: params[:tv][:title])
    @tv.auto_complete

    @genres = Genre.all.order(:name)
    render :new
  end

  private
  def tv_params
    params.require(:tv).permit(:title, :photo, :seasons, :year_start,
                               :year_end, :status, :blurb, :network)
  end

  def check_admin
    unless signed_in? && current_user.admin
      render json: "You are not allowed to perform this action!"
    end
  end
end
