class TvShowsController < ApplicationController
  def new
    @tv = TvShow.new
  end
end
