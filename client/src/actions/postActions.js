import {GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS} from './types'
import axios from 'axios'

export const addPost = postData => dispatch =>{
    axios.post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data,
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const addComment = (post_id, commecntData) => dispatch =>{
    axios.post('/api/posts/comment/'+post_id, commecntData)
        .then(res => 
            dispatch(getPost(post_id))
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const addLike = id => dispatch =>{
    axios.post('/api/posts/like/'+id)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const removeLike = id => dispatch =>{
    axios.post('/api/posts/unlike/'+id)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const deletePost = postId => dispatch =>{
    axios.delete('/api/posts/'+postId)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: postId,
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const deleteComment = (postId, commentId) => dispatch =>{
    axios.delete('/api/posts/comment/'+postId+'/'+commentId)
        .then(res => 
            dispatch(getPost(postId))
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
        
}
export const getPosts = () => dispatch =>{
    dispatch({type: POST_LOADING})
    axios.get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data,
            })
        )
        .catch(err => 
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        )
        
}
export const getPost = (id) => dispatch =>{
    dispatch({type: POST_LOADING})
    dispatch({type: CLEAR_ERRORS})
    axios.get('/api/posts/'+id)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data,
            })
        )
        .catch(err => 
            dispatch({
                type: GET_POST,
                payload: null
            })
        )
        
}


export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}