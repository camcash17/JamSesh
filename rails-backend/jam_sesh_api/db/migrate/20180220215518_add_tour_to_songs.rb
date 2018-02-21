class AddTourToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :onTour, :string
  end
end
