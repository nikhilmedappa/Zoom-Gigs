import {GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL } from '../actions/types'


function getCategoriesReducer(state = { categories: [] }, action) {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
            }
            default:
            return state;
    }
}

function addCategoryReducer(state = { category: {} }, action) {
    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return {
                ...state,
                category: action.payload,
                isLoading: true
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                isLoading: false
            }
        case ADD_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
            default:
            return state;
    }
}

function deleteCategoryReducer(state = { category: {} }, action) {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                category: action.payload,
                isLoading: true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                isLoading: false
            }
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
            default:
            return state;
    }
}




export { getCategoriesReducer, addCategoryReducer, deleteCategoryReducer }