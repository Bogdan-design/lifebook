import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redaxStore";
import {logOutTC} from "../../redux/authReducer";

type DataType = {
    id: number
    email: string
    login: string
}
type HeaderAPIComponentPropsType = {
    resultCode: number
    messages: string[]
    data: DataType
}
type MapDispatchToPropsType = {
    logOutTC:()=>void
}
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
export type OwnPropsType = MapDispatchToPropsType & MapStateToPropsType


class HeaderContainer extends React.Component<OwnPropsType, HeaderAPIComponentPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logOutTC})(HeaderContainer)