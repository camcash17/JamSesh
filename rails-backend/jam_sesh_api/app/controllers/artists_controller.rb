class ArtistsController < ApplicationController
  before_action :set_artist, only: [:show, :update, :delete]
  def index
     @artists = Artist.all
     render json: @artists
  end

  def show
    # @song = Song.where(id: params[:id])
    render json: @artist
  end

  def create
    @artist = Artist.new(artist_params)
    if @artist.save
      puts "Created"
      render json: @artist
    else
      raise "Error!"
    end
  end

  def update
    if @artist.update(artist_params)
      puts "Updated"
      render json: @artist
    else
      raise "Error!"
    end
  end

  def destroy
    if @artist.delete
      puts "Deleted"
      render json: Artist.all
    else
      raise "Error!"
    end
  end

  private

  def artist_params
    params.permit(:name, :artistId)
  end

  def set_artist
    @artist = Artist.find(params[:id])
  end
end
