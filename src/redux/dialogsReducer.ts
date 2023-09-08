export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}


const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}

const initialState: InitialStateType = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra?"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
    ],
    newMessageText: ''


}


export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerACtype): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const text: string = state.newMessageText
            const newMessage: MessageType = {id: 7, message: text}
            return  {...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''}
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessage}
        default:
            return state
    }
}

export type DialogsReducerACtype = ReturnType<typeof addMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>

export const addMessageAC = (newMessage: string) => {
    return {
        type: ADD_MESSAGE,
        newMessage: newMessage
    } as const
}
export const updateNewMessageTextAC = (newMessage: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessage: newMessage
    } as const
}
