export const REQUEST_STAGE = { //APIリクエスト中に画面が今どういう状態なのかを知るための状態です
  INITISL: 'INITISL',
  LOADING: 'LOADING',
  OK: 'OK',
}

export const HTTP_STATUS_CODE = { //APIリクエスト中としてローディングを出せますし、OKであれば成功したアラートを出すこともできる
  NOT_ACCEPTABLE: 406,
}

//　定数なので全て大文字で記載　大文字にすることで変数名(定数名)にすることで代入不可であることを明示