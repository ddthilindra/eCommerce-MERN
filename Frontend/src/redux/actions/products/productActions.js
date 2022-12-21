import axios from "axios";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "./actionTypes";

//Create Product

export const createProductAction = (productData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
        loading: true,
      });
      const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzk0NWQ3YjMwZTdjYTQ1Zjg2ZmFjZWQiLCJmaXJzdE5hbWUiOiJ2ZW5kb3IiLCJsYXN0TmFtZSI6InZlbmRvciIsImVtYWlsIjoidmVuZG9yQG1haWwuY29tIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE2NzA2Njc2NDQxODcsImV4cCI6MTY3MDY2ODg1Mzc4N30.VcI4FwC8tRq5hdTiDlhN7zEzd_odv17haFbzxekTJcs";

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.post(
        "/product/addProduct",
        productData,
        config
      );
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

//Fetch all Products

export const fetchProductsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCT_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("first")
      const { data } = await axios.get("/product/getAllProduct", config);
      console.log(data.data);
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCT_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};
