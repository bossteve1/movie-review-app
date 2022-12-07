class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comments, :user_id, :movie_id, :rating
  belongs_to :movie
end
