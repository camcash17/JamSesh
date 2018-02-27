class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string   :name
      t.string   :email, index: true, unique: true
      t.boolean  :admin, default: false
      t.string   :password_digest
      t.string   :remember_digest
      t.string   :access_token, index: true, unique: true
      t.string   :reset_digest
      t.datetime :reset_sent_at

      t.timestamps null: false
    end
  end
end
