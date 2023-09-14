import {AppDispatch} from "./redaxStore";
import {getAuthUserData} from "./authReducer";

const SET_IS_INITIALIZED = 'SET-IS-INITIALIZED'

export type InitialStateType = {
    isInitialized: boolean

}

const initialState: InitialStateType = {
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: AppReducerACType): InitialStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }

        default :
            return state
    }
}

export type AppReducerACType = ReturnType<typeof isInitializedSuccess>


export const isInitializedSuccess = () => {
    return {
        type: SET_IS_INITIALIZED
    } as const
}

export const initializeTC = () => (dispatch:AppDispatch) => {

    const promise=dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {

            dispatch(isInitializedSuccess())
        })

}