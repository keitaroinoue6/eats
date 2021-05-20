import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components'; //styledコンポーネントが使えるようになる
import { Link } from "react-router-dom";
//LinkとはReact Routerにおけるルーティングは通常のリンク(<a href="")と異なり、<Link to＝＂＂>という形になる
//まず、import層でLinkを使えるようにします。

//components
import Skeleton from '@material-ui/lab/Skeleton'
//Material UIというUIライブラリのコンポーネントをimportする。これはスマホあぷりやSPAでよく使われる「ロード状態」を表すUIパーツです。

//apis
import { fetchRestaurants } from "../apis/restaurants";


//reducers
import { initialState, restaurantsActionTypes, restaurantsReducer } from '../reducers/restaurants';

//constants
import { REQUEST_STATE } from '../constants';

//images
import MainLogo from '../images/logo.png' //画像名前をimportする
import MainCoverImage from '../images/main-cover-image.png'

import RestaurantImage from '../images/restaurant-image.jpg'

//ページの一番上部にあるヘッダー全体を定義
const HeaderWrapper = styled.div` 
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

//ヘッダーのロゴ
const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

//トップページ真ん中のメイン画像
const MainCover = styled.img`
  height: 600px;
`;

//レストラン一覧の全体
const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

//一つ一つのitem
const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;


export const Restaurants = () => {
  //下記のようにすることでコンポーネント内でstateというstateのデータと、dispatchという関数の二つを扱うことができる。関数の命名は自由
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);
  useEffect(() => {
    dispatch({type: restaurantsActionTypes.FETCHING})
    //dispatchは引数にオブジェクトを一つだけとる。そのおぶけくとにはrestaurantsActionTypesで指定されたActionTypeが一つ、またはpayloadの二つが含まれます。
    fetchRestaurants() //引数を取らずにPromiseを返す。成功の場合にはres.dataを返す。その結果を(data)の形にする
    .then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: { //payloadとはReactに限らず、通信に含まれるデータのことを「ペイロードデータ」という
          restaurants: data.restaurants
        }
      })
    )
  }, []) //今回はコンポーネントのレンダリングを一回だけにしたいため第二引数に空配列をいれる
  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList> 
        {
          state.fetchState === REQUEST_STATE.LOADING? 
          //初期状態をのぞいて二つの状態が、一つはロード状態を表すREQUEST_STAGE.LOADING。REQUEST_STAGE.OK
            <>
              <Skeleton variant="rect" width={450} height={300} /> 
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </> //四角形(rect)の横幅450,縦が300
          : //データが届くとREQUEST_STATE.LOADINGではなくなるので：以降がレンダリングされる
            state.restaurantsList.map((item, index) => //配列のデータなのでmapメソッド
              <Link to={`/restaurants/${item.id}/foods`} key={index} style={{textDecoration: 'none'}}>
                <RestaurantsContentWrapper>
                  <RestaurantsImageNode src={RestaurantImage}/>
                  <MainText>{item.name}</MainText>
                  <SubText>{`配送料:${item.fee}円 ${item.time_required}分`}</SubText>
                </RestaurantsContentWrapper>
              </Link>
            )
        }
      </RestaurantsContentsList>
      {
        state.restaurantsList.map(restaurant => //mapとすることでrestaurantsListは配列のデータなので一つずつrestaurantという変数名で参照させる
          <div>
            {restaurant.name}
          </div>
        )
      }
    </>
  )
}
