import axios from 'axios'

import {GET_PROFILE, CLEAR_CURRENT_PROFILE,PROFILE_LOADING, GET_ERRORS, GET_PROFILES} from './types'
// import {logoutUser} from './authActions';
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}
export const getProfiles = ()=> dispatch => {

    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => dispatch({
                type: GET_PROFILES,
                payload: null
            })
        )
    
}

export const createProfile = (profile, history) => dispatch => {
    axios.post('/api/profile', profile)
        .then(res => history.push('/dashboard')
        )
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
export const addExperience = (experience, history) => dispatch => {
    axios.post('/api/profile/experience', experience)
        .then(res => history.push('/dashboard')
        )
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
export const addEducation = (education, history) => dispatch => {
    axios.post('/api/profile/education', education)
        .then(res => history.push('/dashboard')
        )
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const deleteExperience = (exp_id) => dispatch => {
    axios.delete('/api/profile/experience/'+exp_id)
        .then(res =>   
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => console.log(err))
}
export const deleteEducation = (edu_id) => dispatch =>{
    axios.delete('/api/profile/education/'+edu_id)
        .then(res =>   
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => console.log(err))
}
export const deleteAccount = () => dispatch => {
    axios.delete('/api/profile/')
        .then(res => res)
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}



export const setProfileLoading = ()  => {
    return {
        type: PROFILE_LOADING
    }
}
export const clearCurrentProfile = ()  => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}