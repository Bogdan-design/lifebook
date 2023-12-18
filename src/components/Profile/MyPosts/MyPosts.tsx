import React from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Posts/Post";
import {PostsType} from "redux/state";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "utils/validators/validators";
import {Element} from "components/common/FormsControls/FormsControls";
import {ProfileContainerType} from "components/Profile/ProfileContainer";
import usersPhoto from "assets/imeges/avatar.jpg";

type MyPostsPropsType = {
    addPost: (value:string) => void
    posts: PostsType[]
    profile: ProfileContainerType | null

}

export const  MyPosts= React.memo((props: MyPostsPropsType) =>{

    const postsElements = props.posts.map((p) =>
        <Post avatar={props.profile?.photos.small} key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (value: PostFormType) => {
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
})

type PostFormType = {
    post:string
}
const maxLength10 = maxLengthCreator(10)
const MyPostForm: React.FC<InjectedFormProps<PostFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field as='textarea' component={Element} placeholder={'Post'} name={'post'} validate={[required,maxLength10]}/>
            <div>
                <button type={'submit'}>Add Post</button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm<PostFormType>({
    form: 'post'
})(MyPostForm)