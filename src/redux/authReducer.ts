import {AppThunk} from "./redaxStore";
import {authAPI, LoginType} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean

}

const initialState: InitialStateType = {
    id: null,
    email: 'blabla@bla.bla',
    login: 'samurai',
    isAuth: false
}


export const authReducer = (state: InitialStateType = initialState, action: UsersReducerACType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,

                ...action.payload
            }

        default :
            return state
    }
}

export type UsersReducerACType = ReturnType<typeof setAuthUserData>


export const setAuthUserData = (userId: number | null,
                                email: string | null,
                                login: string | null,
                                isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    } as const
}

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        let { email,id:userId, login} = res.data.data
        debugger
        dispatch(setAuthUserData(userId, email, login, true))
    }
}

export const loginTC = (data: LoginType): AppThunk => async (dispatch) => {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
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