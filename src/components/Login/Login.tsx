import React from 'react';

export const Login = () => {
    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginForm/>
        </div>
    );
};


export const LoginForm = () => {
    return (
        <form>
            <div>
                <input placeholder={'Login'}/>
            </div>
            <div>
                <input placeholder={'Password'}/>
            </div>
            <div>
                <input type={"checkbox"}/> remember me
            </div>
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    );
};