import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, GET_CURRENTUSER_REQUEST, GET_CURRENTUSER_SUCCESS, GET_CURRENTUSER_FAIL} from '../actions/types'



function userSigninReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function getCurrentUserReducer(state = { currentUser: {} }, action) {
  switch (action.type) {
    case GET_CURRENTUSER_REQUEST:
      return { loading: true };
    case GET_CURRENTUSER_SUCCESS:
      return { loading: false, currentUser: action.payload };
    case GET_CURRENTUSER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}




function userUpdateReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { userSigninReducer, userRegisterReducer, userUpdateReducer, getCurrentUserReducer }