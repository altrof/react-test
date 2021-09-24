import { UsersAPI } from "../api/api"
import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../components/types/types';
import { Action, Dispatch } from "redux";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                // copy obj ...state
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {isFollowed: true}) 
            }
        case UNFOLLOW:
            return {
                // copy obj ...state
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {isFollowed: false})
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }

}

// -------- Action Creators & Types ------------
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | 
                    SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType |
                    ToggleFollowingProgressActionType


type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


// -------- Thunk Creators ------------
type GetStateType = () => AppStateType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// 1 way of types

export const requestDataUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        const data = await UsersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                                   userId: number, 
                                   apiMethodFlow: any, 
                                   action: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
    const res = await apiMethodFlow(userId)
    if (res.data.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

// 2 way of types

export const follow = (userId: number):ThunkType  => {
    return async (dispatch, getState) => {
        let apiMethodFlow = UsersAPI.follow(userId) //.bind(UsersAPI)
        _followUnfollowFlow(dispatch, userId, apiMethodFlow, followSuccess)
    }
}

export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        let apiMethodFlow = UsersAPI.unfollow(userId) //.bind(UsersAPI)
        _followUnfollowFlow(dispatch, userId, apiMethodFlow, unfollowSuccess)
    }
}

export default usersReducer;