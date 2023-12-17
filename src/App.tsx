import React from 'react';
import './App.css';
import {Navbar} from "components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Sidebar} from "components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "redux/appReducer";
import {AppStateType, store} from "redux/redaxStore";
import {Preloader} from "components/common/Preloader/Preloader";
import {withSuspense} from "hoc/withSuspense";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type AppPropsType = {
    initializeTC: () => void
}

type MapStateToPropsType = {
    isInitialized: boolean
}

export class App extends React.Component<AppPropsType & MapStateToPropsType, AppPropsType> {

    catchAllUnhandledErrors = (promise:any) =>{
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeTC()
        window.addEventListener('unhandledrejection',this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection',this.catchAllUnhandledErrors)
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
                    <Switch>
                    <Redirect exact from="/" to="/profile"/>
                        <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                        <Route path="/sitebar" render={() =>
                            <Sidebar/>}/>
                        <Route path="/users" render={() =>
                            <UsersContainer/>}/>
                        <Route path="/login" render={() =>
                            <Login/>}/>
                        <Route path='*' render={() =>
                            <div style={{textAlign:'center',fontWeight:'bold',fontSize:'25px',marginTop:'8%'}}>404 PAGE NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isInitialized: state.app.isInitialized
})


const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeTC}), withRouter)(App)

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp