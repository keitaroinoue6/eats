module Api
  module V1
    class FoodsController < ApplicationController
      def index
        restaurant = Restaurant.find(params[:restaurant_id])
        # リクエスト時にpara,s[:restaurant_id]というパラメータを受け取ります。
        # そのidを元に全てのRestaurantの中からfindで対応するデータを一つだけ代入する
        foods = restaurant.foods
        # restaurantにはRestaurantが一つだけ入っておりfoods一覧を取得できます

        render json: {
          foods: foods
        }, status: :ok
      end
    end
  end
end
