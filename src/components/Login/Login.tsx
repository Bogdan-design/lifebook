import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../../components/common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import {LoginType} from "../../api/api";
import {AppStateType} from "../../redux/redaxStore";
import {Redirect} from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

type LoginPropsType = {
    loginTC: (data: LoginType) => void
    isAuth: boolean
}

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: LoginType) => {
        props.loginTC(formData)
    }

    if (props.isAuth) {
      return  <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};


const maxLength = maxLengthCreator(20)

export const LoginForm: React.FC<InjectedFormProps<LoginType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
            {props.error && <div className={s.formSummeryError}>{props.error}</div>}
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginType>({
    form: 'login'
})(LoginForm)

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {loginTC})(Login)


