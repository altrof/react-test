import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer.ts';
import { Redirect } from 'react-router';
import styles from '../common/FormsControls/FormsControls.module.css'



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required]} placeholder={"Email"} name={"email"} component={Input} />
            </div>
            <div>
                <Field validate={[required]} placeholder={"Password"} name={"password"} type={"password"} component={Input} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <Field validate={[required]} component={Input} placeholder={"Symbols from image"} name={"captcha"} />}

            { props.error && <div className={styles.formSummaryError}>
             {props.error} 
             </div>}
            <div>
                <button>Login</button>
            </div>
        </form> )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

// -- connect !!!
export default connect(mapStateToProps, {login})(Login);