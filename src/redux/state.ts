import {sidebarReducer} from "./sidebarReducer";
import {dialogsReducer} from "./dialogsReducer";
import {profileReducer} from "./profileReducer";
import {ProfileContainerType} from "components/Profile/ProfileContainer";

export type StoreType = {
    _state: RooteStateType
    _callSuscriber: (s: RooteStateType) => void
    subscribe: (observer: () => void) => void
    getState: () => RooteStateType
    dispatch: (action: any) => void
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
type ProfilePageType = {
    posts: Array<PostsType>
    status: string
    profile: null | ProfileContainerType
}
type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
type SidebarType = {}
export type RooteStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how a you?", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 11},
            ],
            status:'',
            profile: null
        },
        dialogsPage: {
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
        },
        sidebar: {},
    },
    _callSuscriber(state: RooteStateType) {
        console.log('State changed')
    },

    subscribe(observer) {
        this._callSuscriber = observer
    },
    getState() {
        return this._state
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSuscriber(this._state)

    }
}












