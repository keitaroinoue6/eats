import React, { useEffect } from 'react';
//apis
import { fetchRestaurants } from "../apis/restaurants";

export const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants() //引数を取らずにPromiseを返す。成功の場合にはres.dataを返す。その結果を(data)の形にする
    .then((data) =>
      console.log(data)
    )
  }, []) //今回はコンポーネントのレンダリングを一回だけにしたいため第二引数に空配列をいれる
  return (
    <>
      レストラン一覧
    </>
  )
}
