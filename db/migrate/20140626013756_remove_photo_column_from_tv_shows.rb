class RemovePhotoColumnFromTvShows < ActiveRecord::Migration
  def change
    remove_column :tv_shows, :photo
  end
end
