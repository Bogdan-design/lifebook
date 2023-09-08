export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}


const ADD_MESSAGE = 'ADD-MESSAGE'


export type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
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

}


export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerACtype): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const text: string = action.newMessage
            const newMessage: MessageType = {id: 7, message: text}
            return  {...state,
                messages: [...state.messages, newMessage],
                }

        default:
            return state
    }
}

export type DialogsReducerACtype = ReturnType<typeof addMessageAC>
export const addMessageAC = (newMessage: string) => {
    return {
        type: ADD_MESSAGE,
        newMessage
    } as const
}
