class AddImdbIdToTvShows < ActiveRecord::Migration
  def change
    add_column :tv_shows, :imdb_id, :string, unique: true
  end
end
