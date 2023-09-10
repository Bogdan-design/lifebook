import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReduce} from "redux-form";

const reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReduce,
})

// store
export const store = createStore(reducers,applyMiddleware(thunk))

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

// export const useAppDispatch =  () => useDispatch<AppDispatch>()
//
// export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
// types
export type AppStateType =ReturnType<typeof reducers>



// @ts-ignore
window.store =store