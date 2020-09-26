import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAIL, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL, GET_EVENTBYID_REQUEST, GET_EVENTBYID_SUCCESS, GET_EVENTBYID_FAIL, REGISTER_EVENT_REQUEST, REGISTER_EVENT_SUCCESS, REGISTER_EVENT_FAIL, GET_MYREGEVENT_REQUEST, GET_MYREGEVENT_SUCCESS, GET_MYREGEVENT_FAIL, GET_MYORGEVENT_REQUEST, GET_MYORGEVENT_SUCCESS, GET_MYORGEVENT_FAIL, HANDLE_ZOOMSTART_REQUEST, HANDLE_ZOOMSTART_SUCCESS, HANDLE_ZOOMSTART_FAIL, HANDLE_ZOOMEND_REQUEST, HANDLE_ZOOMEND_SUCCESS, HANDLE_ZOOMEND_FAIL,} from '../actions/types'



function zoomStartReducer(state = { zoom: {} }, action) {
    switch (action.type) {
        case HANDLE_ZOOMSTART_REQUEST:
            return {
                ...state,
                zoom: action.payload,
                isLoading: true
            }
        case HANDLE_ZOOMSTART_SUCCESS:
            return {
                ...state,
                zoom: action.payload,
                isLoading: false
            }
        case HANDLE_ZOOMSTART_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;    
    }
}

function zoomEndReducer(state = { zoom: {} }, action) {
    switch (action.type) {
        case HANDLE_ZOOMEND_REQUEST:
            return {
                ...state,
                zoom: action.payload,
                isLoading: true
            }
        case HANDLE_ZOOMEND_SUCCESS:
            return {
                ...state,
                zoom: action.payload,
                isLoading: false
            }
        case HANDLE_ZOOMEND_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;    
    }
}

function getEventsReducer(state = { events: [] }, action) {
    switch (action.type) {
        case GET_EVENT_REQUEST:
            return {
                ...state,
                events: action.payload,
                isLoading: true
            }
        case GET_EVENT_SUCCESS:
            return {
                ...state,
                events: action.payload,
                isLoading: false
            }
        case GET_EVENT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

function createEventReducer(state = { event: {}}, action) {
    switch (action.type) {
        case CREATE_EVENT_REQUEST:
            return {
                ...state,
                event: action.payload,
                isLoading: true
            }
        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                event: action.payload,
                isLoading: false
            }           
        case CREATE_EVENT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}


function getEventByIdReducer(state = { event: {}}, action) {
    switch (action.type) {
        case GET_EVENTBYID_REQUEST:
            return {
                ...state,
                event: action.payload,
                isLoading: true
            }
        case GET_EVENTBYID_SUCCESS:
            return {
                ...state,
                event: action.payload,
                isLoading: false
            }           
        case GET_EVENTBYID_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

function registerEventReducer(state = { registeredevent: {} }, action) {
    switch (action.type) {
        case REGISTER_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_EVENT_SUCCESS:
            return {
                ...state,
                registeredevent: action.payload,
                isLoading: false
            }
        case REGISTER_EVENT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
            default:
            return state;
    }
}

function getMyRegEventsReducer(state = { myregisteredevents: [] }, action) {
    switch (action.type) {
        case GET_MYREGEVENT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_MYREGEVENT_SUCCESS:
            return {
                ...state,
                myregisteredevents: action.payload,
                isLoading: false
            }
        case GET_MYREGEVENT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
            default:
        return state;
    }
}

function getMyOrgEventsReducer(state = { myorganisedevents: [] }, action) {
    switch (action.type) {
        case GET_MYORGEVENT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_MYORGEVENT_SUCCESS:
            return {
                ...state,
                myorganisedevents: action.payload,
                isLoading: false
            }
        case GET_MYORGEVENT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
            default:
        return state;
    }
}




export { getEventsReducer, createEventReducer, getEventByIdReducer, registerEventReducer, getMyRegEventsReducer, getMyOrgEventsReducer, zoomStartReducer, zoomEndReducer}