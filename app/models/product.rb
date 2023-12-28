class Product < ApplicationRecord
  has_many_attached :images
  belongs_to :category
  has_many :stocks
  has_many :order_products
end
