class CreateEvents < ActiveRecord::Migration[5.2]
  def up
    create_table :events do |t|
      t.string :name
      t.string :photo
      t.string :urlname
      t.string :event_id , unique: true

      t.timestamps
    end
  end

  def def down 
    drop_table :events
  end
end
