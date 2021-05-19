//REQUEST＿STATEという定数をconstant.jsから取り込む
import { REQUEST_STATE } from '../constants';

export const initialState = { //initialStateは初期値stateで、useReducerに渡す
  fetchState: REQUEST_STATE.INITIAL, //GET APIの状態を表す。一般的にAPIからデータを取得するときにfetch...という名前にする
  restaurantList: [], //APIカラ取得したレストラン一覧が入ってきます。初期値は空配列として[]を入れておく
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS '
}

export const restaurantsReducer = (state, action) => {
  switch(action.type) {
    case restaurantsActionTypes.FETCHING: //API取得
      return {
        ...state,
        ferchState: REQUEST_STATE.LOADING, //API取得中→fetchStateはLOADINGにスイッチする
      };
      case restaurantsActionTypes.FETCH_SUCCESS:
        return {
          fetchState: REQUEST_STATE.OK, //API取得完了→fetchstate→OKにして、restaurantsListにデータをいれる
          restaurantsList: action.payload.restaurants,
        };
      default:
        throw new Error();
  }
}

//export const...としているのは外部でも参照させるため