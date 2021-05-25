import { REQUEST_STATE } from '../constants';

export const initialState = { //restaurant.jsと同じ
  fetchState: REQUEST_STATE.INITIAL, //APIの状態を表す
  foodsList: [], //取得したフード一覧が格納される。空配列
};

export const foodsActionTyps = {
  FETCHING: 'FETCHING', //取得中を表す
  FETCH_SUCCESS: 'FETCH_SUCCESS' //取得の成功状態
}

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTyps.FETCHING: //ローディング中
      return { //foodsReducerはfoodsActionTypesによってstateを2種類返すようになっている
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTyps.FETCH_SUCCESS: //成功した場合
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      };
    default:
      throw new Error();
  }
}

// {...state}という表現はスプレッド構文という
// 配列やオブジェクトなどを展開するために使っています。