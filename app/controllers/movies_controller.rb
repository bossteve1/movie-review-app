class MoviesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response


    def index 
        movies = Movie.all
        render json:movies, status: :ok
    end

    def show 
        movie = Movie.find(params[:id])
        render json: movie, status: 200, serializer: MovieWithReviewsSerializer
    end

    private
    # def find_movie
    #     Movie.find_by(id: params[:id])
    # end

    def render_not_found_response
        render json: { errors: "movie not found" }, status: :not_found
    end
end
