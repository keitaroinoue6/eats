module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create]

      def create
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          # 他店舗での仮注文がすでにある場合例外処理 exists？で例外があるか判断している
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end

        set_line_food(@ordered_food) #line_foodインスタンスを生成

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        if ordered_food.line_food.present? #　新しく生成する場合、すでに同じfoodに関するline_foodが存在する場合の判断をここでしている 
          @line_food = ordered_food.line_food # 全く新しくline_foodを作成する場合　インスタンスを新規作成している
          @line_food.attributes = { #trueの場合インスタンスの既存の情報を更新しています
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
