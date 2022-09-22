import hfRequest from '../../index'
import { CategoryType } from './type'
enum categoryApi {
  GET_ALL_CATEGORY = '/category/getAllCategory'
}


export function getAllCategory() {
  return hfRequest.get<CategoryType[]>({
    url: categoryApi.GET_ALL_CATEGORY
  })
}
