class ApplicationController < ActionController::API
  before_action :fake_load

  def fake_load
    sleep(1)
  end
end

# ローカル環境だけ、本番環境では入れないこと
# よりSPAっぽい挙動をするためのコード