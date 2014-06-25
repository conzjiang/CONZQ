class CreateWatchlists < ActiveRecord::Migration
  def change
    create_table :watchlists do |t|
      t.integer :user_id, null: false
      t.integer :tv_show_id, null: false
      t.string :status, null: false
      
      t.timestamps
    end
    
    add_index :watchlists, [:user_id, :tv_show_id], unique: true
    add_index :watchlists, :status
  end
end
