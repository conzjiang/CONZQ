class ChangeStatusToEnum < ActiveRecord::Migration
  def up
    statuses = {}

    TvShow.find_each do |tv|
      enum = TvShow::STATUSES.index(tv.status)
      statuses[tv.id] = enum
    end

    remove_column :tv_shows, :status
    add_column :tv_shows, :status, :integer

    TvShow.find_each do |tv|
      tv.update!(status: statuses[tv.id])
    end
  end

  def down
    statuses = {}

    TvShow.find_each do |tv|
      statuses[tv.id] = tv.status
    end

    remove_column :tv_shows, :status
    add_column :tv_shows, :status, :string

    TvShow.find_each do |tv|
      tv.update!(status: statuses[tv.id])
    end
  end
end
