class Order < ApplicationRecord
  has_many :line_foods

  validates :total_price, numericality: { greater_than: 0 }

  # ここではLineFoodデータの更新とOrderデータの保存を処理している
  # これらの処理をトランザクションの中で行うことで、この二つの処理のいずれかが失敗した場合に全ての処理がなかったことにする
  def save_with_update_line_foods!(line_foods)
    ActiveRecord::Base.transaction do
      line_foods.each do |line_food|
        line_food.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end

