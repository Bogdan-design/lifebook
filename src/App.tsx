import React, {Suspense} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "../src/redux/appReducer";
import {AppStateType, store} from "../src/redux/redaxStore";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

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
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                    <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
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


const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeTC}), withRouter)(App)

const MainApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp