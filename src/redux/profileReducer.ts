import {AppThunk} from "./redaxStore";
import {profileAPI, usersAPI} from "../api/api";
import {ProfileContainerType} from "../components/Profile/ProfileContainer";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type InitialStateType = {
    posts: Array<PostsType>
    profile: ProfileContainerType | null
    status: string
}

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how a you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
    ],
    profile: null,
    status:'Yo'
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerACType): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: 5,
                message: action.newPost,
                likesCount: 11
            }
            return {...state, posts: [...state.posts, newPost]}
        case DELETE_POST: {

            return {...state,posts: state.posts.filter(p=> p.id !== action.id)}
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

export type ProfileReducerACType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
| ReturnType<typeof setStatus>
| ReturnType<typeof deletePost>


export const addPostAC = (newPost: string) => {
    return {
        type: ADD_POST,
        newPost
    } as const
}
export const deletePost = (id: number) => {
    return {
        type: DELETE_POST,
        id
    } as const
}
const setUserProfile = (profile: ProfileContainerType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

export const getUserProfile = (userId: number) : AppThunk =>async (dispatch) =>{

    const res = await usersAPI.getProfile(userId)
            dispatch(setUserProfile(res.data))

}
export const getStatus = (userId: number) : AppThunk => async (dispatch) =>{
   const res = await profileAPI.getStatus(+userId)
            dispatch(setStatus(res.data))
}

export const updateStatus = (status:string) : AppThunk =>async (dispatch) =>{
  const res=await  profileAPI.updateStatus(status)
            if(res.data.resultCode===0){
            dispatch(setStatus(status))
            }
}
