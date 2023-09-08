import React, {ChangeEvent, ComponentType} from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Posts/Post";
import {PostsType} from "../../../redux/state";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type MyPostsPropsType = {
    addPost: (value:string) => void
    posts: PostsType[]

}

export const MyPosts = (props: MyPostsPropsType) => {


    const postsElements = props.posts.map(p =>
        <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (value:PostFormType) => {
        props.addPost(value.post)
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My post</h3>
                <MyPostReduxForm onSubmit={onAddPost}/>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

type PostFormType = {
    post:string
}

const MyPostForm: React.FC<InjectedFormProps<PostFormType>> = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'post'}/>
            <div>
                <button type={'submit'}>Add Post</button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm<PostFormType>({
    form: 'post'
})(MyPostForm)