class AddNetworkToTvShows < ActiveRecord::Migration
  def change
    add_column :tv_shows, :network, :string
  end
end
