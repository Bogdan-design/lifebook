import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "components/common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "redux/authReducer";
import {LoginType} from "api/api";
import {AppStateType} from "redux/redaxStore";
import {Redirect} from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

type LoginPropsType = {
    loginTC: (data: LoginType) => void
    isAuth: boolean
    captcha: string | null
}

type MapStateToProps = {
    captcha: string | null
    isAuth: boolean
}

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: LoginType) => {
        props.loginTC(formData)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    );
};


const maxLength = maxLengthCreator(20)

export const LoginForm: React.FC<InjectedFormProps<LoginType, { captcha: string | null }> & { captcha: string | null }>
    = ({handleSubmit, error, captcha}) => {
    return (
        <div>
            <div>
               <p>Email: free@samuraijs.com</p>
               <p>Password: free</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field as='input' placeholder={'Email'} name={'email'} component={Element}
                           validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field as='input' placeholder={'Password'} name={'password'} type={'password'} component={Element}
                           validate={[required, maxLength]}/>
                </div>
                <div>
                    <Field as='input' type={"checkbox"} text={'remember me'} name={'rememberMe'} component={Element}/>
                </div>
                {captcha && <img src={captcha} alt={'captcha'}/>}
                {captcha && <Field placeholder={'Symbols from image'} as='input' name={'captcha'} validate={[required]}
                                   component={Element}/>}
                {error && <div className={s.formSummeryError}>{error}</div>}
                <div>
                    <button type={'submit'}>Login</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginType, { captcha: string | null }>({
    form: 'login'
})(LoginForm)

let mapStateToProps = (state: AppStateType): MapStateToProps => ({
    captcha: state.auth.captcha,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {loginTC})(Login)


