import {AppThunk} from "./redaxStore";
import {profileAPI, usersAPI} from "../api/api";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type InitialStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile: null | string
    status: string
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how a you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
    ],
    newPostText: 'Write her',
    profile: null,
    status:''
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerACtype): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 11
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default :
            return state
    }
}

export type ProfileReducerACtype = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>
| ReturnType<typeof setStatus>

export const addPostAC = (newPost: string) => {
    return {
        type: ADD_POST,
        newPost: newPost
    } as const
}
const setUserProfile = (profile: string) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

export const getUserProfile = (userId: number) : AppThunk =>(dispatch) =>{
    usersAPI.getProfile(+userId)
        .then(res => {
            dispatch(setUserProfile(res.data))
        })
}
export const getStatus = (userId: number) : AppThunk =>(dispatch) =>{
    profileAPI.getStatus(+userId)
        .then(res => {
            dispatch(setStatus(res.data))
        })
}
export const updateStatus = (status:string) : AppThunk =>(dispatch) =>{
    profileAPI.updateStatus(status)
        .then(res => {
            if(res.data.resultCode===0){
            dispatch(setStatus(status))
            }
        })
}
