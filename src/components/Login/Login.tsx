import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../components/common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

export const Login = () => {

    const onSubmit = (formData:FormDataType) =>{
        console.log(formData)
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

type FormDataType= {
    login: string
    password: string
    rememberMe:boolean

}

const maxLength = maxLengthCreator(10)

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={Input} validate={[required,maxLength]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[required,maxLength]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={Input}/> remember me
            </div>
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({
    form:'login'
}) (LoginForm)