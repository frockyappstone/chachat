class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.string :sender
      t.text :body

      t.timestamps null: false
    end
  end
end
