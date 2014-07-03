class AddProfileInfoColumnsToUsers < ActiveRecord::Migration
  def self.up
    add_attachment :users, :photo
    add_column :users, :bio, :text
  end
  
  def self.down
    remove_attachment :users, :photo
    remove_column :users, :bio, :text
  end
end
