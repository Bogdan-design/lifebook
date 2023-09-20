import {AppThunk} from "./redaxStore";
import {authAPI, LoginType, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'
const SET_CAPTCHA = 'samurai-network/auth/SET-CAPTCHA'

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null

}

const initialState: InitialStateType = {
    id: null,
    email: 'blabla@bla.bla',
    login: 'samurai',
    isAuth: false,
    captcha: null // if null, then captcha is not required
}


export const authReducer = (state: InitialStateType = initialState, action: UsersReducerACType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default :
            return state
    }
}

export type UsersReducerACType = ReturnType<typeof setAuthUserData> | ReturnType<typeof setCaptcha>


export const setAuthUserData = (id: number | null,
                                email: string | null,
                                login: string | null,
                                isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            login,
            isAuth
        }
    } as const
}

export const setCaptcha = (url:string) => {
    return {
        type: SET_CAPTCHA,
        payload: {
           url
        }
    } as const
}

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        let { email,id, login} = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const loginTC = (data: LoginType): AppThunk => async (dispatch) => {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if(res.data.resultCode === 10) {
            dispatch(captchaTC())
        }
        const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }

}

export const logOutTC = (): AppThunk => async (dispatch) => {
    const res = await authAPI.logOut()
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export const captchaTC = (): AppThunk=> async (dispatch)=>{
    const res = await securityAPI.getCaptchaUrl()
    const captcha = res.data.url
    dispatch(setCaptcha(captcha))

}