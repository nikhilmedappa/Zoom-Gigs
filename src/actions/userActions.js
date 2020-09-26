import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, GET_CURRENTUSER_REQUEST, GET_CURRENTUSER_SUCCESS, GET_CURRENTUSER_FAIL
  } from './types'
import _ from  "lodash"
import Axios from "axios"
import Cookie from 'js-cookie'

export const getCurrentUser = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: GET_CURRENTUSER_REQUEST });
  try {
    const { data } = await Axios.get("https://super1233456.herokuapp.com/api/users/getCurrentuser", {
      headers: {
        "x-auth-token": userInfo,
      }
    });
    dispatch({ type: GET_CURRENTUSER_SUCCESS, payload: data })
    console.log("Current User: ", data)
  } catch (error) {
    dispatch({ type: GET_CURRENTUSER_FAIL, payload: error.message })
  }
}


export const updatePayment = ( formData ) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: formData });
  try {
    const { data } = await Axios.put("https://super1233456.herokuapp.com/api/users/updateguest", formData, {
      headers: {
        "x-auth-token": userInfo,
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}
  
export const signin = (userdata) => async (dispatch) => {
  userdata = _.pick(userdata,["username","password"]);
  dispatch({ type: USER_SIGNIN_REQUEST, payload: userdata });
  try {
    const { data } = await Axios.post("https://super1233456.herokuapp.com/api/auth/token", userdata);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}
  
export const register = (userdata) => async (dispatch) => {
  userdata = _.pick(userdata,["username","password","email"]);
  dispatch({ type: USER_REGISTER_REQUEST, payload: userdata });
  try {
    const { data } = await Axios.post("https://super1233456.herokuapp.com/api/users/register", userdata);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    console.log("Registration Return", data)
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}


  
export const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}