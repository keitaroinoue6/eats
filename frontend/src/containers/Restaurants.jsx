import React, { useEffect } from 'react';
import styled from 'styled-components'; //styledコンポーネントが使えるようになる
//apis
import { fetchRestaurants } from "../apis/restaurants";

//images
import MainLogo from '../images/logo.png' //画像名前をimportする
import MainCoverImage from '../images/main-cover-image.png'

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


export const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants() //引数を取らずにPromiseを返す。成功の場合にはres.dataを返す。その結果を(data)の形にする
    .then((data) =>
      console.log(data)
    )
  }, []) //今回はコンポーネントのレンダリングを一回だけにしたいため第二引数に空配列をいれる
  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo"></MainLogoImage>
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover"></MainCover>
      </MainCoverImageWrapper>
    </>
  )
}
