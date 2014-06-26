class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :idol_id, null: false
      t.integer :follower_id, null: false

      t.timestamps
    end

    add_index :follows, [:idol_id, :follower_id], unique: true
  end
end
