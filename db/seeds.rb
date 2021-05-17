# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do |n| #　レストランは表示上三つだけなので3.times
  restaurant = Restaurant.new( # 三回Restaurant.new()させる
    name: "testレストラン_#{n}",
    fee: 100,
    time_required: 10,
  )

  12.times do |m| # Restaurantにつき12このFoodも作成
    restaurant.foods.build( # restaurant.foods.buildとすることで、Food.newすることなくリレーションを持ったfoodを生成することができる
      name: "フード名_#{m}",
      price: 500,
      description: "フード_#{m}の説明文です。"
    )
  end

  restaurant.save! # 最後に生成したrestaurantインスタンスsave!とすることでデータをDBに書き込むことができます。
end