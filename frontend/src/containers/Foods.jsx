import React,{ useEffect } from 'react';

//apis
import { fetchFoods } from '../apis/foods';

export const Foods = (props) => {
  useEffect(() => {
    fetchFoods(1)
    .then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <>
      フード一覧
      <p>
        restaurantsIdは {props.match.params.restaurantsId} です
      </p>
    </>
  )
}

//restaurantsIdををコンポーネントが受け取ってリクエストに乗せるためには、
//matchオブジェクト