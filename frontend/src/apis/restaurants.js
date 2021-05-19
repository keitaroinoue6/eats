//レストラン一覧のAPIを呼ぶ関数だけのがファイル

import axios from 'axios'
import { restaurantsIndex } from '..//urls/index'

export const fetchRestaurants = () => {
  return axios.get(restaurantsIndex) //今回はgetですが、POSTであればaxios.post()のようになります。
  .then(res => { //成功した場合の処理 resという名前で取得し、res.dataでレスポンスの中身だけをreturnしています
    return res.data
  })
  .catch((e) => console.error(e)) //失敗・例外 コンソールでエラーを出すだけにしています。
}

//axiosはPromiseベースであること。つまりaxiosを使う側でnew Promiseなどしなくても非同期処理を実装することができる