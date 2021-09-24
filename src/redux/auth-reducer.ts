import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'altrof-social/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'altrof-social/auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

// Reducer принимает state, action и возвращает state такого же типа, которого принимает
export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}


/* ------ ACTION CREATORS -------- */
type SetAuthUserDataActionPayloadType = {
    userId: number | null, 
    email: string | null,  
    login: string | null,  
    isAuth: boolean 
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, 
                                login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
                                    type: SET_USER_DATA, payload: { userId, email, login, isAuth } })



type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({
     type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


/* ------ THUNK MIDDLEWARE CREATORS -------- */
export const getAuthUserData = () => async (dispatch: any) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        let { id, login, email } = res.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any ) => async (dispatch: any) => {
    let res = await authAPI.login(email, password, rememberMe, captcha)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const res = await securityAPI.getCaptchaUrl()
    const captchaUrl = res.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, true))
    }
}

export default authReducer;