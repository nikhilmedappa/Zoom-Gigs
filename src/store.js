import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import Cookie from 'js-cookie';

import {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
    getCurrentUserReducer
  } from './reducers/userReducers';

import {
    getCategoriesReducer, 
    addCategoryReducer,
    deleteCategoryReducer
} from './reducers/categoryReducers'

import {
    getEventsReducer,
    createEventReducer,
    getEventByIdReducer,
    registerEventReducer,
    getMyRegEventsReducer,
    getMyOrgEventsReducer,
    zoomStartReducer,
    zoomEndReducer


} from './reducers/eventReducers'

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,

    getCategories: getCategoriesReducer,
    addCategory: addCategoryReducer,
    deleteCategory: deleteCategoryReducer,

    getEvents: getEventsReducer,
    createEvent: createEventReducer,
    getEventById: getEventByIdReducer,
    registeredevent: registerEventReducer,
    getCurrentUser: getCurrentUserReducer,
    getMyRegEvents: getMyRegEventsReducer,
    getMyOrgEvents: getMyOrgEventsReducer,
    
    zoomStart: zoomStartReducer,
    zoomEnd: zoomEndReducer,

});

const userInfo = Cookie.getJSON('userInfo') || null;


const middleware = [thunk];
const initialState = {
    userSignin: { userInfo },
};


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
)

export default store;



