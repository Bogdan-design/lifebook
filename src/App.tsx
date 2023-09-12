import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "../src/redux/appReducer";
import {AppStateType} from "../src/redux/redaxStore";
import {Preloader} from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initializeTC: () => void
}

type MapStateToPropsType = {
    isInitialized: boolean
}

export class App extends React.Component<AppPropsType & MapStateToPropsType, AppPropsType> {
    componentDidMount() {
        this.props.initializeTC()
    }

    render() {
        if (!this.props.isInitialized){
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={() =>
                        <ProfileContainer/>}/>
                    <Route path="/dialogs" render={() =>
                        <DialogsContainer/>}/>
                    <Route path="/sitebar" render={() =>
                        <Sidebar/>}/>
                    <Route path="/users" render={() =>
                        <UsersContainer/>}/>
                    <Route path="/login" render={() =>
                        <Login/>}/>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   isInitialized: state.app.isInitialized
})


export default compose<React.ComponentType>(connect(mapStateToProps, {initializeTC}), withRouter)(App)
