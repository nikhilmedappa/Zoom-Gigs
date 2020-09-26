import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL} from './types'

import _ from 'lodash';
import Axios from 'axios'


export const getCategories = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORY_REQUEST });
    try {
        const { data } = await Axios.get('https://super1233456.herokuapp.com/api/categories');
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
        console.log("Category Details", data)
    } catch (error) {
        dispatch({ type: GET_CATEGORY_FAIL, payload: error.message })
    }
}

export const addCategory = ( category ) => async ( dispatch, getState ) => {
    category = _.pick(category,[ "name", "description" ]);
    const { 
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: ADD_CATEGORY_REQUEST, payload: category });
    try {
        const { data } = await Axios.post('https://super1233456.herokuapp.com/api/categories', category, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            }
        });
        dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_CATEGORY_FAIL, payload: error.message });
    }
}

export const deleteCategory = ( categoryId ) => async (dispatch, getState) => {
    try {
        const { 
            userSignin: { userInfo },
        } = getState();
        dispatch({ type: DELETE_CATEGORY_REQUEST, payload: categoryId });
        const { data } = await Axios.delete('https://super1233456.herokuapp.com/api/categories/' + categoryId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            }
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data, success: true }); 
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAIL, payload: error.message })
    }
};