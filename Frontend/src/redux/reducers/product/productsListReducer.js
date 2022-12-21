import React from 'react';
import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from '../../actions/products/actionTypes';

const ProductsListReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
          return {
            loading: true,
          };
        case FETCH_PRODUCT_SUCCESS:
          return {
            products: action.payload,
            loading: false,
          };
        case FETCH_PRODUCT_FAIL:
          return {
            loading: false,
            error: action.payload,
          };
        default:
          return state;
      }
}

export default ProductsListReducer;
