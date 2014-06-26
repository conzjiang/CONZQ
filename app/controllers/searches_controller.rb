class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end

  def create
    @search_param_names = search_param_names(params[:search])
    @query = run_query(params[:search])

    render :show
  end

  def show

  end

  def sort
    query = params[:query]
    comparator = sort_params[:sort_by]
    fail
    if comparator == "A-Z"
      @query = query.order(:title)
    elsif comparator == "Z-A"
      @query = query.order(:title).reverse
    elsif comparator == "Highest Rating"
      @query = query.order(:rating).reverse
    elsif comparator == "Lowest Rating"
      @query = query.order(:rating)
    end

    render :show
  end

  private
  def search_params
    params.require(:search).permit(:genre_ids, :decade_ids, :status)
  end

  def sort_params
    params.require(:comparator).permit(:sort_by)
  end
end
