class CreateTvDecades < ActiveRecord::Migration
  def change
    create_table :tv_decades do |t|
      t.integer :decade_id, null: false
      t.integer :tv_show_id, null: false
      t.timestamps
    end
    
    add_index :tv_decades, [:decade_id, :tv_show_id], unique: true
  end
end
