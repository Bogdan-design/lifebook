import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redaxStore";
import {InitialStateType} from "../../../redux/profileReducer";
import {Dispatch} from "redux";



type MapStatePropsType = InitialStateType


type MapDispatchPropsType = {
    updateNewPostText:(text:string)=> void
    addPost:(newPost:string)=>void

}

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return{
        posts:state.profilePage.posts,
        newPostText:state.profilePage.newPostText,
        profile:state.profilePage.profile,
        status:state.profilePage.status

    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapDispatchPropsType => {
    return{
        updateNewPostText: (text:string)=> {
            dispatch(updateNewPostTextAC(text))
        },
        addPost:(newPost:string)=>{
            dispatch(addPostAC(newPost))
        }

    }
}

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)