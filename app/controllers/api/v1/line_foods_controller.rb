module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def index # 仮注文の一覧
        line_foods = LineFood.active # 全てのLineFoodモデルからactiveなものを取得
        if line_foods.exists? # line_foodが空かどうかをチェック
          render json: {
            line_food_ids: line_foods.map { |line_food| line_food.id },
            # 登録されているLineFoodのidを配列形式にしている。rubyのmapメソッドは配列やオブジェクトなどを一つずつ取り出し、mapより後ろのブロックを当てていきます
            restaurant: line_foods[0].restaurant,
            # 一つの仮注文につき一つの店舗という仕様のため、line_foodsの中にある先頭のline_foodインスタンスの店舗の情報を詰めている
            count: line_foods.sum { |line_food| line_food[:count] },
            # line_foodインスタンスには数量を表す:countがある。計算はサーバーサイドの方がいい
            amount: line_foods.sum { |line_food| line_food.total_amount },
            # amounrには各line_foodがインスタンスメソッドtotal_amountを呼んで[数量*単価]のさらに合計を計算している
          }, status: :ok
        else
          render json: {}, # 空データとstatus: :no-contentを返します
          status: :no_content
        end
      end


      def create # 仮注文の作成
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          # 他店舗での仮注文がすでにある場合例外処理 exists？で例外があるか判断している
          # .exists?メソッドは対象のインスタンスのデータがDBに存在するかどうか？をtrue,falseで返す
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

      def replace
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
        # 他店舗のactiveなLneFood一覧を取得し、そのままeachに渡す
          line_food.update_attribute(:active, false)
          # こうすることで他店舗のLineFood一つづつに対してupfate_attributeで更新している
          # 更新内容は引数に渡された(:active, false)で、line_food.activeをfalseにするという意味。
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: { #　saveが成功した場合,status:created、@line_foodを
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
