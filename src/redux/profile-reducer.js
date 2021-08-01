import { profileAPI, UsersAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    posts: [
        { id: 1, message: 'Hello JavaScript!', likesCount: 36 },
        { id: 2, message: 'I am read to hacking!', likesCount: 73 },
        { id: 3, message: 'Lets start', likesCount: 94 }
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        default:
            return state;
    }

}

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const addPost = (newPostBody) => ({ type: ADD_POST, newPostBody })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const getUserProfile = (userId) => async (dispatch) => {
    const res = await UsersAPI.getProfile(userId)
    dispatch(setUserProfile(res.data))
}
export const getStatus = (userId) => async (dispatch) => {
    const res = await profileAPI.getStatus(userId)
    dispatch(setStatus(res.data))
}
export const updateStatus = (status) => async (dispatch) => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}


export default profileReducer;