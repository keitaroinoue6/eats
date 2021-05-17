class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  belongs_to :order, optional: true # optional: trueにすることで関連付けが任意になる

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }
  # scopeはモデルそのものや関連するオブジェクトに対するクエリを指定することができる。その返り値は必ずAcrtiveRecprd＿Relationとなる。
  # 上記のscopeは全てのLineFoodからwhereでactive:trueなもの一覧を返してくれる
  def total_amount
    # 特定のline_foodインスタンスが持つfoodの金額と数量を掛け合わせた合計金額を求めるもの
    # これをモデルに書くことで様々な箇所から呼び出すことができる
    food.price * count
  end
end
