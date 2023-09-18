import {ProfileContainerType} from "../ProfileContainer";
import React from "react";
import {Contact} from "./Contacts";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../../../components/common/FormsControls/FormsControls";

const ProfileDataForm: React.FC<InjectedFormProps<FormType, { profile: ProfileContainerType }>> = (props) => {
    const {profile, handleSubmit} = props

    return <form onSubmit={handleSubmit}>
        <div>
            <button type={"submit"}>Save</button>
        </div>
        <div>
            <b>Full name:</b><Field as='input' placeholder={'Full name'} name={'fullName'} component={Element}
                                    validate={[]}/>
        </div>
        <div>
            <b>Looking for a job:</b>{profile.lookingForAJob ? ' Yes' : ' No'}
            <Field as='input' type={'checkbox'} name={'lookingForAJob'} component={Element}/>
        </div>
        <div>
            <b>My professional skills:</b>
            <Field as='textarea' name={'lookingForAJobDescription'} component={Element}/>
        </div>
        <div>
            <b>About me:</b><Field as='textarea' name={'aboutMe'} component={Element}/>
        </div>
        <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map(k => {
            return <Contact key={k} contactTitle={k} contactValue={profile.contacts[k]}/>
        })}
        </div>
    </form>
}

export const ProfileDataReduxForm = reduxForm<FormType, { profile: ProfileContainerType }>({
    form: 'editProfile'
})(ProfileDataForm)


export type FormType = {
    fullName: string
    lookingForAJob:boolean
    lookingForAJobDescription:string
    aboutMe:string
}