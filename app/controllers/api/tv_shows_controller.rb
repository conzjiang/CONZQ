class Api::TvShowsController < ApplicationController
  before_action :check_admin, only: [
    :new, :create, :edit, :update, :destroy
  ]

  def index
    @tvs = TvShow.all.to_a
    @tvs.map! { |tv| add_misc_to_show(tv) }
 
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
    tv = TvShow.find(params[:id])
    @tv = add_misc_to_show(tv)
    
    render json: @tv
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
  
  def add_misc_to_show(tv)
    full_tv = JSON.parse(tv.to_json)
    full_tv[:genres] = tv.genre_names.join(", ")
    full_tv[:decades] = tv.decade_years.join(", ")
    full_tv[:photo_big] = tv.photo.url(:big)
    full_tv[:photo_medium] = tv.photo.url(:medium)
    full_tv[:photo_thumb] = tv.photo.url(:thumb)
    
    full_tv
  end
end
