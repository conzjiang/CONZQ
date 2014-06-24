class CreateTvShows < ActiveRecord::Migration
  def change
    create_table :tv_shows do |t|
      t.string :title, null: false
      t.string :photo
      t.float :rating
      t.integer :year_start
      t.integer :year_end
      t.string :status
      t.integer :seasons
      t.text :blurb
      t.integer :admin_id, default: 1
      
      t.timestamps
    end
    
    add_index :tv_shows, :title
    add_index :tv_shows, :admin_id
  end
end
