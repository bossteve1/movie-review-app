class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :movie_length, :director, :image_url
end
