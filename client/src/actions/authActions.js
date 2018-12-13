// Register User
// 
import {GET_ERRORS, SET_CURRENT_USER} from '../actions/types'

import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {


    axios
        .post('/api/users/register', userData)
        .then(res => {
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    // return {
    //     type: TEST_DISPATCH,
    //     payload: userData
    // }

}

export const loginUser = (userData) => dispatch => {


    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to local storage
            const {token} = res.data
            // Set token to localstorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token)
            // Decode token to get user data
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded)) 
            // history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    // return {
    //     type: TEST_DISPATCH,
    //     payload: userData
    // }

}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    // Remove token
    localStorage.removeItem('jwtToken');
    // Remove auth header token
    setAuthToken(false)
    dispatch(setCurrentUser({}))

}