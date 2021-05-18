module Api # 名前空間を指定している
  module V1
    class RestaurantsController < ApplicationController
      def index
        restaurants = Restaurant.all # Restaurantモデルを全て習得

        render json: { #JSON形式でデータを返している
          restaurants: restaurants
        }, status: :ok # このようにすることでリクエストが成功したこと、200OKと一緒にデータを返す
      end
    end
  end
end
