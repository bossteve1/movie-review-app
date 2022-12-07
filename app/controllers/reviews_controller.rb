class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        reviews = Review.all
        render json:reviews, status: :ok
    end

    def show 
        review = find_review
        render json: review
    end

    def create 
        review =Review.create!(params_review)
        render json: review
    end

    def update 
        review = find_review
        review.update!(params_description)
        render json: review
    end





    private 

    def find_review
        Review.find_by(id: params[:id])
    end

    def params_review
        params.permit(:comments, :user_id, :movie_id, :rating)
    end

    def params_description 
        params.permit(:comments, :rating)
    end

    def render_not_found_response
        render json: { errors: "Review not found" }, status: :not_found
    end
end
