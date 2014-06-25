class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :tv_show_id, null: false
      
      t.timestamps
    end
    
    add_index :favorites, [:user_id, :tv_show_id], unique: true
  end
end
