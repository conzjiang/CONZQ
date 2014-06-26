class SearchesController < ApplicationController
  def new
    @decades = Decade.all
    @genres = Genre.all.order(:name)
  end

  def create
    @search_param_names = search_param_names(params[:search])
    @search_params = @search_param_names.join("+")
    @query = run_query(params[:search])

    render :show
  end

  def show

  end

  def sort
    @search_params = params[:query]
    @comparator = sort_params[:sort_by]

    @query = sort_results(@search_params, @comparator)
    @search_param_names = @search_params.split("+")

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
