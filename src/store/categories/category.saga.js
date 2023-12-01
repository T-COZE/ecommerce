import {takeLastest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';

import { CATEGORIES_ACTION_TYPES }from './categories.types';




// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart())
//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray))
//     } catch (error){
//       dispatch(fetchCategoriesFailed(error))
//     }
// }
export function* fetchCategoriesAsync(){ 
    try {
      const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
      yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error){
      yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories() {
    yield takeLastest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,)
}

    export function* categoriesSaga() {
        yield all()
    }