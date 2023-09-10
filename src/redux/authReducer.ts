import {AppThunk} from "./redaxStore";
import {authAPI, LoginType} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean

}

const initialState: InitialStateType = {
    userId: null,
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

export const getAuthUserData = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                let {userId, email, login} = res.data.data
                dispatch(setAuthUserData(userId, email, login,true))
            }
        })
}

export const loginTC = (data: LoginType): AppThunk => (dispatch) => {
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logOutTC = (): AppThunk => (dispatch) => {
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false))
            }
        })
}