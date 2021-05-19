// このファイルではサーバーサイドで定義したURL文字列を返す定数を設定
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`

export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
//foodsIdexはURL文字列の途中に任意のrestaurantIdが入るため、引数にrestaurantIdを受け取り、それを文字列の中に展開している

export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;

export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;

export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
