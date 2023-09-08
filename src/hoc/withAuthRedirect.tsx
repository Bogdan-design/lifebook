import {Redirect} from "react-router-dom";
import React from "react";
import {AppStateType} from "../redux/redaxStore";
import {connect} from "react-redux";

type StateToPropsForRedirectType = {
    isAuth:boolean
}
let mapStateToPropsForRedirect = (state: AppStateType): StateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})
export const withAuthRedirect = (Component:any)=>{
    class RedirectComponent extends React.Component<any, any>{
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }

   let ConnectRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectRedirectComponent
}