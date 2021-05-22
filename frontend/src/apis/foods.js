import axios from 'axios';
import { foodsIndex } from '../urls/index' //URL文字列を返す関数のimport

export const fetchFoods =(restaurantId) => {
  return axios.get(foodsIndex(restaurantId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
