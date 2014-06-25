class CreateDecades < ActiveRecord::Migration
  def change
    create_table :decades do |t|
      t.integer :years, null: false
      
      t.timestamps
    end
  end
end
