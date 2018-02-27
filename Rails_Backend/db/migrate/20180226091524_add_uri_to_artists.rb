class AddUriToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :uri, :string
  end
end
