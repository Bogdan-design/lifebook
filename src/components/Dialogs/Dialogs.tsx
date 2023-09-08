import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {InitialStateType} from "../../redux/dialogsReducer";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsPropsType = {
    dialogsPage:InitialStateType
    isAuth: boolean
    addMessage:(value:string)=>void

}

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)


    const addNewMessage = (value:MessageFormDataType) =>{
        props.addMessage(value.newMessageBody)
        console.log(value.newMessageBody)
    }

   if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

type MessageFormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<MessageFormDataType>> =(props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} placeholder={"Enter you message"} name={'newMessageBody'}/>
            <div>
                <button type={'submit'}>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<MessageFormDataType>({
    form:'dialogAddMessageForm'
})(AddMessageForm)