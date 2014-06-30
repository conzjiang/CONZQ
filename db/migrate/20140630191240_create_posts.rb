class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.integer :tv_show_id
      t.text :body, null: false
      
      t.timestamps
    end
    
    add_index :posts, :user_id
    add_index :posts, :tv_show_id
  end
end
