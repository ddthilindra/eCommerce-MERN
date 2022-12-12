import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import userReducer from '../reducers/userAuthReducer';
// import userProfileReducer from '../reducers/userProfileReducer';
// import userUpdateReducer from '../reducers/userUpdateReducer';
// import booksListReducer from '../reducers/books/booksListReducer';
// import bookDetailReducer from '../reducers/books/bookDetailsReducer';
// import usersListReducer from '../reducers/usersListReducer';
import createProductReducer from '../reducers/product/createProductReducer';

const middleware = [thunk];

const reducer = combineReducers({
  // userLogin: userReducer,
  // userProfile: userProfileReducer,
  // updatedUser: userUpdateReducer,
  productCreated: createProductReducer,
  // productsList: booksListReducer,
  // productDetails: bookDetailReducer,
  // usersList: usersListReducer,
});

//store
//Initial state

//This is the initial state for all the reducers. NOTE the keys of the reducers above must be the same as the one you will pass as initialstate
//The key must be the same and secondly look at the way the structure of the data in the store

//Get the user in local storage

const userAuthFromStorage = localStorage.getItem('userAuthData')
  ? JSON.parse(localStorage.getItem('userAuthData'))
  : null;

const initialState = {
  userLogin: { userInfo: userAuthFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
