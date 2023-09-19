import {ContactsType, ProfileContainerType} from "../ProfileContainer";
import React from "react";
import s from "./ProfileInfo.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../../../components/common/FormsControls/FormsControls";

type PropsDataForm = {
    profile: ProfileContainerType
}

const ProfileDataForm: React.FC<InjectedFormProps<FormType, PropsDataForm> & PropsDataForm>
    = ({profile, handleSubmit,error}) => {
    debugger
    console.log(error)

    return <form onSubmit={handleSubmit}>
        <div>
            <button type={"submit"}>Save</button>
            {error && <div className={s.error}>{error}</div>}
        </div>
        <div>
            <b>Full name:</b><Field as='input' placeholder={'Full name'} name={'fullName'} component={Element}
                                    validate={[]}/>
        </div>
        <div>
            <b>Looking for a job:</b>
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
            <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:</b>
                <Field as='input' placeholder={key} name={'contacts.'+key} component={Element}/>
            </div>
        })}
        </div>

    </form>
}

export const ProfileDataReduxForm = reduxForm<FormType, PropsDataForm>({
    form: 'editProfile'
})(ProfileDataForm)


export type FormType = {
    fullName: string
    lookingForAJob:boolean
    lookingForAJobDescription:string
    aboutMe:string
    contacts:ContactsType
}