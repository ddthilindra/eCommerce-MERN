 //Create book

import axios from "axios";
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS } from "./actionTypes";

export const createBook = bookData => {
    return async dispatch => {
      try {
        dispatch({
          type: CREATE_PRODUCT_REQUEST,
          loading: true,
        });
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.post('/api/books', bookData, config);
  
        dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CREATE_PRODUCT_FAIL,
          error: error.response && error.response.data.message,
        });
      }
    };
  };