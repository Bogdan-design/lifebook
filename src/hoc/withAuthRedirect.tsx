import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "redux/redaxStore";


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {

        let {isAuth, ...rest} = props

        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...rest as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}


// type

type MapStateToPropsType = {
    isAuth: boolean
}