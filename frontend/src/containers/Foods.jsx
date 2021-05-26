//基本はレストラン一覧と同じく,useEffectで一度だけAPIを叩き、その返り値をreducerを通してstateにセットしていく
import React,{ useEffect, useReducer } from 'react';


//reducer
//import { A as B } from '...'とすることでAと定義されてるmoduleをこのファイルではBとしてimportすることができる
//initialStateという名前のmoduleをfoodsInitialStateとい名前にしてimportしている
//あとでinitialStateという名前のオブジェクトが登場するため
//同一ファイルで同じ名前のmoduleやグローバル変数を扱うことはできないのでどちら一方を変更している
import {initialState as foodsInitialState, foodsActionTypes, foodsReducer} from '../reducers/foods';

//apis
import { fetchFoods } from '../apis/foods';

//constants
import { REQUEST_STATE } from '../constants';



export const Foods = (props) => {
  //foodsInitialStateをuseReducerに渡している。
  // ここではfoodsStateという名前にしている。stateでもいいが後ほどuseStateでstateという名前を使うため
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  useEffect(() => {
    dispatch({type: foodsActionTypes.FETCHING});
    fetchFoods(props.match.params.restaurantsId)
    .then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload:{
          foods:data.foods
        }
      });
    })
  }, [])
  return (
    <>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING?
          <>
            <p>
              ロード中
            </p>
          </>
        :
          foodsState.foodsList.map(food =>
            <div key ={food.id}>
              {food.name}
            </div>
          )
      }
    </>
  )
}

//restaurantsIdををコンポーネントが受け取ってリクエストに乗せるためには、
//matchオブジェクト