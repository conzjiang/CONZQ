class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end
  
  def create
    
  end
end
