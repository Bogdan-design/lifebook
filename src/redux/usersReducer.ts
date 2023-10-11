import {usersAPI, UsersFromServerType} from "api/api";
import {AppThunk} from "./redaxStore";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: InitialStateType = initialState, action: UsersReducerACtype): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.id
                    ? {...el, followed: false}
                    : el)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.id
                    ? {...el, followed: true}
                    : el)
            }
        case SET_USERS:
            return {
                ...state, users: action.payload.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.payload.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.payload.totalCount
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.id]
                    : state.followingInProgress.filter(id => id !== action.payload.id)
            }
        default :
            return state
    }
}

export const followSuccess = (id: number) => {
    return {
        type: FOLLOW,
        payload: {
            id,
        }
    } as const
}
export const unfollowSuccess = (id: number) => {
    return {
        type: UNFOLLOW,
        payload: {
            id,
        }
    } as const
}
export const setUsers = (users: UsersFromServerType[]) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: {
            currentPage
        }
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        payload: {
            totalCount
        }
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const
}
export const toggleFollowingInProgress = (id: number, isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        payload: {
            id,
            isFetching
        }
    } as const
}

// thunks

export const requestUsers = (page: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
  const res = await  usersAPI.getUsers(page, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
}


const followUnfollow =async (dispatch:Dispatch,id:number,apiMethod:any,actionCreator:any)=>{
    dispatch(toggleFollowingInProgress(id, true))
    const res = await apiMethod(id)
    if (res.resultCode === 0) {
        dispatch(toggleIsFetching(false))
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingInProgress(id, false))
}

export const follow = (id: number): AppThunk => async (dispatch) => {
   return followUnfollow(dispatch,id,usersAPI.followAPI.bind(id),unfollowSuccess)
}

export const unfollow = (id: number): AppThunk => async (dispatch) => {
    return followUnfollow(dispatch,id,usersAPI.unfollowAPI.bind(id),followSuccess)
}


// types
export type InitialStateType = {
    users: UsersFromServerType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]

}
export type PostsType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
type LocationType = {
    city: string
    country: string
}

type ActionCreatorType = | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>

export type UsersReducerACtype =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>
