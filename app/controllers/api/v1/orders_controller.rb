module Api
  module V1
    class OrdersController < ApplicationController
      def create
        posted_line_foods = LineFood.where(id: params[:line_food_ids])
        # 複数の仮注文があっるため、複数idの配列がパラメーターとして送られてくる。これらをLineFood.whereに渡すことで対象のidのデータを取得し、変数に代入
        order = Order.new(
          total_price: total_price(posted_line_foods),
          # それらを合算してOrder.newし、orderインスタンスを生成している
        )
        if order.save_with_update_line_foods!(posted_line_foods)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_price(posted_line_foods)
        posted_line_foods.sum {|line_food| line_food.total_amount } + posted_line_foods.first.restaurant.fee
      end
    end
  end
end
