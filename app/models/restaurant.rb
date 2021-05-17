class Restaurant < ApplicationRecord
  has_many :foods
  has_many :line_foods, through: :foods

  validates :name, :fee, :time_required, presence: true #　データが入っていないとエラーが出ることを定義
  validates :name, length: { maximum: 30 } # 最大文字数30以下に設定
  validates :fee, numericality: { greater_than: 0 } # これは手数料なので誤ってマイナスが入らないようにしている
end
