class AddColumnsToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :name, :string
    add_column :artists, :artistId, :integer
    add_column :artists, :onTour, :string
  end
end
