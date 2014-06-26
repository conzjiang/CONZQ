class AddStatusToGenres < ActiveRecord::Migration
  def change
    add_column :genres, :top_level, :boolean, default: false
  end
end
