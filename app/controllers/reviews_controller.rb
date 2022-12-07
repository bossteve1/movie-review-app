class ReviewsController < ApplicationController
    def index 
        reviews = Review.all
        render json:reviews, status: :ok
    end

    def show 
        review = Review.find_by(id: params[:id])
        if review
            render json: review
        else render json: { error: "Review not found" }, status: :not_found
    end
    end

    def create 
        review =Review.create!(params_review)
        render json: review
    end



    private 
    def params_review
        params.permit(:comments, :user_id, :movie_id, :rating)
    end
end
