class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :line_food #FoodモデルはLineFoodモデルと1:1の関係にあるのでhas_oneを定義
end
