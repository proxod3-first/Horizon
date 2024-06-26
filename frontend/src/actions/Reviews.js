import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL, END_LOADING, FETCH, FETCH_REVIEWS_BY_HOSTEL } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const createReview = (newReview) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createReview(newReview)
      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
}

export const getReviewsByUserAndHotel = (uid,hid) => async (dispatch) =>{
    try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getReviewsByUserAndHotel(uid, hid);
    dispatch({ type: FETCH, payload: { review: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
}
export const getReviewsByHotel = (id) => async (dispatch) =>{
    try {
    dispatch({type:START_LOADING})
    console.log('getting reviews by hotel')
    console.log(id)
    const {data} = await api.getReviewsByHotel(id)
    dispatch({type:FETCH_REVIEWS_BY_HOSTEL,payload:{reviews:data }})
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}
export const updateReview = (id, newReview) => async (dispatch)=>{
  try {
    const { data } = await api.updateReview(id, newReview);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}