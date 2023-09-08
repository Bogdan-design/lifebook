import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {InitialStateType} from "../../redux/dialogsReducer";
import {Redirect} from "react-router-dom";

type DialogsPropsType = {
    dialogsPage:InitialStateType
    isAuth: boolean
    addMessage:()=>void
    updateNewMessageText:(newMessage:string)=>void
}

export const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage
    const newMessageBody = state.newMessageText

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);


    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>()


    const addMessage = () => {
        props.addMessage()
    }

    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const newMessage =  e.currentTarget.value
        props.updateNewMessageText(newMessage)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                <textarea placeholder={"Enter you message"} value={newMessageBody}
                          onChange={onChangeHandler}
                          ref={newMessageElement}></textarea>
                </div>
                <div>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}