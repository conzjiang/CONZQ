class AddAttachmentPhotoToTvShows < ActiveRecord::Migration
  def self.up
    change_table :tv_shows do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :tv_shows, :photo
  end
end
