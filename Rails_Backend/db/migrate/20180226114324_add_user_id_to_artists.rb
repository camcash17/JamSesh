class AddUserIdToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :userId, :integer
  end
end
