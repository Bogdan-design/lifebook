import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReduce} from "redux-form";
import {appReducer} from "./appReducer";

const reducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReduce,
    app:appReducer
})

// devtools



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)
));


// store
// export const store = createStore(reducer,applyMiddleware(thunk))

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

// export const useAppDispatch =  () => useDispatch<AppDispatch>()
//
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
// types
export type AppStateType =ReturnType<typeof reducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}



// @ts-ignore
window.store =store