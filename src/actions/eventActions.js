import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAIL, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL, GET_EVENTBYID_REQUEST, GET_EVENTBYID_SUCCESS, GET_EVENTBYID_FAIL, REGISTER_EVENT_REQUEST, REGISTER_EVENT_SUCCESS, REGISTER_EVENT_FAIL, GET_MYREGEVENT_REQUEST, GET_MYREGEVENT_SUCCESS, GET_MYREGEVENT_FAIL, GET_MYORGEVENT_REQUEST, GET_MYORGEVENT_SUCCESS, GET_MYORGEVENT_FAIL, HANDLE_ZOOMSTART_REQUEST, HANDLE_ZOOMSTART_SUCCESS, HANDLE_ZOOMSTART_FAIL, HANDLE_ZOOMEND_REQUEST, HANDLE_ZOOMEND_SUCCESS, HANDLE_ZOOMEND_FAIL } from "./types"
import Axios from "axios"


export const zoomStart = ( id ) => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: HANDLE_ZOOMSTART_REQUEST });
    try {
        const something ={};
        const { data } = await Axios.post('https://super1233456.herokuapp.com/api/events/startEvent/' + id, something , {
            headers: {
                "x-auth-token": userInfo,
            }
        });
        dispatch({ type: HANDLE_ZOOMSTART_SUCCESS, payload: data });
        window.open(data.start_url, "_blank")
        console.log("EventId", id)
        console.log("ZOOM START", data)
    } catch (error) {
        dispatch({ type: HANDLE_ZOOMSTART_FAIL, payload: error.message })
    }
}

export const zoomEnd = ( id ) => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    const something ={};
    dispatch({ type: HANDLE_ZOOMEND_REQUEST });
    try {
        const { data } = await Axios.post("https://super1233456.herokuapp.com/api/events/completeEvent/" + id, something, { 
            headers: {
                "x-auth-token": userInfo
            }
        });
        dispatch({ type: HANDLE_ZOOMEND_SUCCESS, payload: data });
        console.log("ZOOM START", data)
    } catch (error) {
        dispatch({ type: HANDLE_ZOOMEND_FAIL, payload: error.message })
    }
}





export const getEvents = () => async (dispatch) => {
    dispatch({ type: GET_EVENT_REQUEST });
    try {
        const { data } = await Axios.get("https://super1233456.herokuapp.com/api/events");
        dispatch({ type: GET_EVENT_SUCCESS, payload: data });
        console.log('Event Data', data)
    } catch (error) {
        dispatch({ type: GET_EVENT_FAIL, payload: error.message })
    }
}


export const getMyRegEvents = () => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: GET_MYREGEVENT_REQUEST });
    try {
        const { data } = await Axios.get("https://super1233456.herokuapp.com/api/events/getevents/myregisteredevents", { 
            headers: {
                "x-auth-token": userInfo
            }
        });
        dispatch({ type: GET_MYREGEVENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_MYREGEVENT_FAIL, payload: error.message })
    }
}

export const getMyOrgEvents = () => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: GET_MYORGEVENT_REQUEST });
    try {
        const { data } = await Axios.get("https://super1233456.herokuapp.com/api/events/getevents/myevents", {
            headers: {
                "x-auth-token": userInfo,
            }
        });
        dispatch({ type: GET_MYORGEVENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_MYORGEVENT_FAIL, payload: error.message })
        console.log("Error: ", error.message)
    }
}


export const createEvent = ( formData ) => async ( dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: CREATE_EVENT_REQUEST, payload: formData });
    try {
        const { data } = await Axios.post('https://super1233456.herokuapp.com/api/events', formData, {
            headers: {
                "x-auth-token": userInfo,
                "Content-Type": 'multipart/form-data'
            }
            
        });
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_EVENT_FAIL, payload: error.message })
    }
}


export const getEventById = (id) => async (dispatch) => {
    dispatch({ type: GET_EVENTBYID_REQUEST });
    try {
        const { data } = await Axios.get("https://super1233456.herokuapp.com/api/events/" + id);
        dispatch({ type: GET_EVENTBYID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_EVENTBYID_FAIL, payload: error.message })
    }
}

export const registerEvent = ( data ) => async ( dispatch, getState) => {
    const {id, orderAmount} = data
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({ type: REGISTER_EVENT_REQUEST });
    try {
        const requestBody = {
            "amount": String(orderAmount*100),
            "currency": "INR",
            "receipt": "su001",
            "payment_capture": '1'
        }
        const { data } = await Axios.post('https://super1233456.herokuapp.com/api/events/payment/order?id=' + id, requestBody, { 
            headers: {
                "x-auth-token": userInfo
            }
        });
        var options = {
            "key": data.key_id, 
            "amount": data.sub.amount, 
            "currency": data.sub.currency,
            "name": "ZoomGigs",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": data.sub.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                const verifyBody = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,}
    
                const { data } =  await Axios.post('https://super1233456.herokuapp.com/api/events/payment/verify?id=' + id, verifyBody, { 
                    headers: {
                        "x-auth-token": userInfo
                    }
                })
                dispatch({ type: REGISTER_EVENT_SUCCESS, payload: data});
            },
            "prefill": {
                "name": "Gaurav Kumar",
            },
            "theme": {
                "color": "#F37254" 
            } 
        };
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
    } catch (error) {
        dispatch({ type: REGISTER_EVENT_FAIL, payload: error.message })
    }
}

