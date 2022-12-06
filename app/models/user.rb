class User < ApplicationRecord
    has_many :reviews
    
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :username, length: {minimum: 5}
end
