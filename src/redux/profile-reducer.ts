import { profileAPI, UsersAPI } from "../api/api"
import { stopSubmit } from 'redux-form';
import { PostType, ProfileType, PhotosType } from '../components/types/types';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [
        { id: 1, message: 'Hello JavaScript!', likesCount: 36 },
        { id: 2, message: 'I am read to hacking!', likesCount: 73 },
        { id: 3, message: 'Lets start', likesCount: 94 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }

}

// ----------- ACTION CREATORS & TYPES ---------------

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const setStatus = (status: string): SetStatusActionType  => ({ type: SET_STATUS, status })
export const addPost = (newPostBody: string): AddPostActionType => ({ type: ADD_POST, newPostBody })
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const res = await UsersAPI.getProfile(userId)
    dispatch(setUserProfile(res.data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    const res = await profileAPI.getStatus(userId)
    dispatch(setStatus(res.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const res = await profileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const res = await profileAPI.saveProfile(profile)
    if (res.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("ProfileEdit", { _error: res.data.messages[0] }))
        return Promise.reject()
    }
}


export default profileReducer;