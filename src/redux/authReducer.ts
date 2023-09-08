import {AppThunk} from "./redaxStore";
import {authAPI} from "../api/api";

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
    isAuth:false
}


export const authReducer = (state: InitialStateType = initialState, action: UsersReducerACtype): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth:true
            }

        default :
            return state
    }
}

export type UsersReducerACtype = ReturnType<typeof setAuthUserData>


export const setAuthUserData = (userId: number  | null,
                                email: string | null,
                                login: string | null) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login
        }
    } as const
}

export const getAuthUserData = () : AppThunk =>(dispatch)=>{
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
}