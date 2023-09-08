import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Posts/Post";
import {PostsType} from "../../../redux/state";

type MyPostsPropsType = {
    addPost:()=>void
    updateNewPostText:(text:string)=>void
    posts: PostsType[]
    newPostText:string
}

export const MyPosts = (props: MyPostsPropsType) => {


    const postsElements = props.posts.map(p =>
        <Post message={p.message} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()


    const onAddPost = () => {
        props.addPost()
        // props.dispatch(addPostAC(''))
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        props.updateNewPostText(text)
        // props.dispatch(updateNewPostTextAC(text))

    }


    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My post</h3>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}